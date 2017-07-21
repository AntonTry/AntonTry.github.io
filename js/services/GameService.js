class GameService {
    constructor(connection) {
        this.connection = connection;
        this.gameRef = this.connection.ref().child('Games');
        this.ref = this.connection.ref();
    }
    getGameById(gameId) {
        return this.gameRef
            .child(gameId)
            .once('value')
            .then((res) => {
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
            .then((res) => {
                    console.log(res.key);
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };
}
