class Game{
    constructor(){
        this.id = 0;
        this.teams = [];
        this.rounds = [];
        this.results = [];
        this.resultService = null;
        this.teamService = null;
        this.gameService = null;
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
