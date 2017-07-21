class TeamBuilder{

    constructor(teamService){
        this.teamService = teamService;
    }


    getTeamsInputs(){
        var teamInputs = document.querySelectorAll('input[type="text"]');
        return teamInputs;
    }

    build(){
        var teams = [];
        var teamsInputs = this.getTeamsInputs();
        for (let i = 0; i < teamsInputs.length; i++){
            teams[i] = new Team(teamsInputs[i].value);
            this.teamService.save(teams[i])
                .then((res)=>{
                    teams[i].id = res.key;
                })
        }
        return teams;
    }

}

class Team{
    constructor(name){
        this.id;
        this.name = name;
    }
}