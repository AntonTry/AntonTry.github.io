class GameBuilder {
    constructor() {
        this.game = new Game();
    }

    setRound(id, numberOfQuestion) {
        this.game.rounds.push(new GameRound(id, numberOfQuestion));
        return this;
    }

    setRounds(rounds) {
        for (i = 0; i < rounds.length; i++) {
            var newRound = new GameRound(i, rounds[i]);
            this.game.rounds.push(newRound);
        }

    }

    setTeam(team) {
        this.game.teams.push(new GameTeam(team.id, team.name));
        return this;
    }

    setTeams(teams) {
        for (i = 0; i < teams.length; i++) {
            var gameTeam = new GameTeam(teams[i].id, teams[i].name);
            this.game.teams.push(gameTeam);
        }
    }

    buildGame() {
        return this.game;
    }
}
