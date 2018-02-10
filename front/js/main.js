const ranking = new Ranking('#numbers-ranking');
ranking.init();

const randomNumbers = new Ranking('#numbers-random');

randomNumbers.clear = function() {
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
            randomNumbers.clear();
            randomNumbers.render();
        })
        .catch(function(error) {
            console.error(error);
        });
};

function compareNumbers(rankingNumObj, randomNumObj){
    if(rankingNumObj.length > 0 && randomNumObj.length > 0){
        /*TO DO*/
    }
}

setInterval(() => {
    randomNumbers.init();
    console.log(ranking.numbers, randomNumbers.numbers);

}, 5000);
