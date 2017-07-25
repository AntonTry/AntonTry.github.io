class NextQuizz{
    constructor(currentRound, currentQuizz){
        this.currentRound = currentRound;
        this.currentQuizz = currentQuizz;
    }
    
    nextPage() {
        this.gs = new GameService(DbConnection.getConnection());
        let gameId = localStorage.getItem("gameId");

        this.gs.getGameById(gameId)
            .then(res =>
            {
                this.updateCurrent(res.val())
            });

    }

    updateCurrent(game){
        if((game.rounds[this.currentRound-1] == this.currentQuizz)&&(game.rounds.length-1 != currentRound)){
            let changeRound = this.gs.setCurrentRound(++this.currentRound);
            let changeQuizz = this.gs.setCurrentQuiz(1);
            Promise.all([changeRound, changeQuizz])
                .then(res => {
                    document.location.href = '../player/RoundStatistic.html'
                });
        }
        else if(game.rounds.length == this.currentRound-1){
            document.location.href = '../player/Total.html';
        }
        else {
            this.gs.setCurrentQuiz(++this.currentQuizz)
                .then(res => {
                    document.location.href = '../admin/setAnswers.html'
                });
        }

    }
}
