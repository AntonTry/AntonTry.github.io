class GameService {
    constructor(connection) {
        this.connection = connection;
        this.gameRef = this.connection.ref().child('games');
        this.ref = this.connection.ref();
    }

    getGameById(gameId) {
        return this.gameRef
            .child(gameId)
            .once('value')
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                })
    }

    save(game) {
        return this.gameRef
            .push(game)
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };

    getCurrentRound(gameId) {
        return this.gameRef
            .child(gameId)
            .child('currentRound')
            .once('value')
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                }
            )
    }

    getCurrentQuiz(gameId) {
        return this.gameRef
            .child(gameId)
            .child('currentQuiz')
            .once('value')
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                }
            )
    }
}
