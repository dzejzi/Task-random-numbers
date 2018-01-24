document.addEventListener('DOMContentLoaded', function() {

    let occurrencesArray = [];
    let numbersRanking = document.getElementById('numbers-ranking');
    const secondCard = document.querySelectorAll('.card')[1];
    let newUl = document.createElement('ul');
    newUl.classList.add('list-group');
    newUl.classList.add('list-group-flash');

    function getArrayWithNumbersRanking() {
        fetch('http://localhost:3000/numbers', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(responseJson => {
                dataArray = responseJson.data;
                createOccurencesArray(responseJson.data);
            })
            .catch(error => console.error('Error:', error));
    }

    function createOccurencesArray(numbers) {

        function ObjectNumber(number) {
            this.number = number;
        }

        numbers.forEach(number => {
            occurrencesArray.push(new ObjectNumber(number))
        });

    }

    function getRandomNumbers() {
        setInterval(() => {
            fetch('http://localhost:3000/random-numbers', {
                    method: 'GET',
                })
                .then(response => response.json())
                .then(responseJson => {
                    addRandomNumbersTOSecondCard(responseJson.data);
                    countOccurrences(responseJson.data);
                })
                .catch(error => console.error('Error:', error));
        }, 10000)
    }

    function addRandomNumbersTOSecondCard(randomNumbers) {
        newUl.innerHTML = '';
        randomNumbers.forEach(element => {
            let newLi = document.createElement('li');
            newLi.classList.add('list-group-item');
            newLi.innerHTML = element;
            newUl.append(newLi);
            secondCard.append(newUl);
        });
    }

    function countOccurrences(randomNumbers) {

        occurrencesArray.forEach(number => {
            randomNumbers.forEach(randomNumber => {
                if (!number.hasOwnProperty('occurrences')) {
                    number.occurrences = 0;
                }
                if (number.number === randomNumber) {
                    number.occurrences = number.occurrences + 1;
                }
            })
        });

        addOccurrencesTOFirstCard(occurrencesArray)
    }

    function addOccurrencesTOFirstCard(arrayFinal) {
        function compare(a, b) {
            if (b.occurrences < a.occurrences)
                return -1;
            if (b.occurrences > a.occurrences)
                return 1;
            return 0;
        }

        arrayFinal.sort(compare);

        numbersRanking.innerHTML = '';

        arrayFinal.forEach(element =>{
            let newLiFirstCard = document.createElement('li');
            newLiFirstCard.classList.add('list-group-item');
            newLiFirstCard.innerHTML = `${element.number} was drawn<strong>  ${element.occurrences}</strong> times`
            numbersRanking.append(newLiFirstCard);
        });

    }

    getArrayWithNumbersRanking();
    getRandomNumbers()




})
