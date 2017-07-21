var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(config);
var database = firebase.database();

class Team {
    constructor(name) {
        this.id;
        this.name = name;
    }
}

class Result {
    constructor(round, quizz, teamId, score) {
        this.round = round;
        this.quizz = quizz;
        this.teamId = teamId;
        this.score = score;
    }
}

class Game {
    constructor(teams) {
        this.teams = teams;
    }
}

class GameBuilder {
    static build(teams) {
        return new Game(teams);
    }
}

class GameService {
    constructor(database) {
        this.gamesRef = database.ref().child("games");
    };

    save(game) {
        var key = this.gamesRef.push(game).key;
        return key;
    }
}

class TeamService {
    constructor(database) {
        this.teamRef = database.ref().child("teams");
    }

    save(team) {
        return this.teamRef.push(team).key;
    }

    getById(id) {
        var team;
        this.teamRef.child(id).on("value", snap => {
            team = snap.val();
        });
        return team;
    }
}

class ResultService {
    constructor(database) {
        this.gamesRef = database.ref().child("games");
    }

    saveResult(result, gameId) {
        this.gamesRef.child(gameId)
            .child("results")
            .child(result.round + "_" + result.quizz + "_" + result.teamId).set(result);
    }
}


// var teamService = new TeamService(database);
//
// var team = {};
// var results = [];
// for (var i = 0; i < 3; i++) {
//     var key = teamService.save(new Team(Math.random().toString(36).substring(7)));
//     team[key] = teamService.getById(key).name;
//     results.push(new Result(1, 1, key, Math.random() > 0.5 ? 1 : 0));
// }
//
//
// var gameService = new GameService(database);
// var gameKey = gameService.save(GameBuilder.build(team));
// var resultService = new ResultService(database);
// for (var i = 0; i < results.length; i++) {
//     resultService.saveResult(results[i], gameKey);
// }