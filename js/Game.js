class Game{
    constructor(){
        this.teams = [];
        this.rounds = [];
        this.results = [];
        this.resultService = null;
        this.teamService = null;
        this.gameService = null;
    }

    convertForFirebase(){
        var temp = {};
        for(let i = 0; i < this.teams.length; i++){
            temp[this.teams[i].id] = this.teams[i].name;
        }
        this.teams = temp;

        var roundsTemp = {};
        for(let i = 0; i < this.rounds.length; i++){
            roundsTemp[this.rounds[i].id] = this.rounds[i].quantityOfQuestions;
        }
        this.rounds = roundsTemp;

        return this;
    }


    convertFromFirebase(){

    }


    setTeamService(teamService){
        this.teamService = teamService;
    }

    setResultService(resultService){
        this.resultService = resultService;
    }

    setGameService(gameService){
        this.gameService = gameService;
    }



    getRoundsQuantity(){
        return rounds.length;
    }

    getGameResult(){
       let gameResults = this.resultService.getResultsById();

    }

    getRoundResult(){

    }

    getTeamResult(teamId){
        let teamResult = this.resultService.getTeamResults(teamId, this.id);
    }
}
