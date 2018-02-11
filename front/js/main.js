const ranking = new Ranking('#numbers-ranking');
const randomNumbers = new Ranking('#numbers-random');

Ranking.prototype.clear = function() {
    const container = this.getDOMElement();

    if (container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

randomNumbers.init = function() {
    axios.get('http://localhost:3000/random-numbers')
        .then(response => {
            this.numbers = response.data.data.map(number => {
                return {
                    id: number
                }
            });
            this.clear();
            this.render();
        })
        .catch(function(error) {
            console.error(error);
        });
};

function compareNumbers(){

    if(ranking.numbers.length > 0 && randomNumbers.numbers.length > 0){
            randomNumbers.numbers.map( randomNumber => {
                ranking.numbers.map(rankingNumber =>{
                    if (!rankingNumber.hasOwnProperty('occurrences')) {
                        rankingNumber.occurrences = 0;
                    }
                    if (rankingNumber.id === randomNumber.id) {
                        rankingNumber.occurrences++;
                    }
                })

            });

            function sortFromMostToLeastPopular(a, b) {
                if (b.occurrences < a.occurrences)
                    return -1;
                if (b.occurrences > a.occurrences)
                    return 1;
                return 0;
            }

            ranking.numbers.sort(sortFromMostToLeastPopular);
            ranking.clear();
            ranking.render();
            //console.log(ranking.numbers);
    }
}

ranking.init();

setInterval(() => {
    randomNumbers.init();
    compareNumbers();

}, 5000);
