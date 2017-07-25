class NextQuizz{
    constructor(gameService, currentRound, currentQuizz){
        this.gs = gameService;
        this.currentRound = currentRound;
        this.currentQuizz = currentQuizz;
    }
    
    nextPage() {
        this.gameId = localStorage.getItem("gameId");

        this.gs.getGameById(this.gameId)
            .then(res =>
            {
                this.updateCurrent(res.val())
            });

    }

    updateCurrent(game){
        if((game.rounds[this.currentRound-1] == this.currentQuizz)&&(game.rounds.length-1 != currentRound)){
            let changeRound = this.gs.setCurrentRound(++this.currentRound, game);
            let changeQuizz = this.gs.setCurrentQuiz(1, this.gameId);
            Promise.all([changeRound, changeQuizz])
                .then(res => {
                    document.location.href = '../player/RoundStatistic.html'
                });
        }
        else if(game.rounds.length == this.currentRound-1){
            document.location.href = '../player/Total.html';
        }
        else {
            let n = this.currentQuizz+1;
            this.gs.setCurrentQuiz(n, this.gameId)
                .then(res => {
                    document.location.href = '../admin/setAnswers.html'
                });
        }

    }
}
