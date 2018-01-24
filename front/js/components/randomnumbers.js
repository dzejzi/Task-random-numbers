document.addEventListener('DOMContentLoaded', function(){

let secondCard = document.querySelectorAll('.card')[1];
let newUl = document.createElement('ul');
newUl.classList.add('list-group');
newUl.classList.add('list-group-flash');


function addRandomNumbersTOSecondCard() {
    setInterval(() => {
        fetch('http://localhost:3000/random-numbers', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(responseJson => {
                newUl.innerHTML = '';
                responseJson.data.forEach((element) => {
                    let newLi = document.createElement('li');
                    newLi.classList.add('list-group-item');
                    newLi.innerHTML = element;
                    newUl.append(newLi);
                    secondCard.append(newUl);
                });

            })
            .catch(error => console.error('Error:', error));
    }, 1000)
}

addRandomNumbersTOSecondCard();

})
