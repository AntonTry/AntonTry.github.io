class Team {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }
}

class TeamBuilder {

    constructor(teamService) {
        this.teamService = teamService;
        this.teams = this.getTeamsInputs();
    }

    getTeamsNames() {
        return this.teams;
    }


    getTeamsInputs() {
        let teamInputs = document.querySelectorAll('input[type="text"]');
        return teamInputs;
    }

    build() {
        let promises = [];
        let teamService = this.teamService;
        this.getTeamsInputs().forEach(function (input) {
            promises.push(teamService.save({name: input.value}))
        })
        return promises;
    }

    setTeams() {
        Promise.all(this.build()).then(values => {
                let teams = [];
                for (let i = 0; i < values.length; i++) {
                    teams.push(new Team(this.teams[i].value, values[i].key))
                }
                localStorage.setItem("teams", JSON.stringify(teams));
            }
        );
    }
}

function createTeamListener() {
    let teamBuilder = new TeamBuilder(new TeamService(DbConnection.getConnection()));
    teamBuilder.setTeams();
}

