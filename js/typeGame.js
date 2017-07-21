var buildButton = document.getElementById("game-build");


function buildGameForFirebase() {
    var numberOfRoundsElem = document.getElementById('number-tour');
    var numberOfRounds = numberOfRoundsElem.value;
    var gameBuilder = new GameBuilder();

    for (let i = 0; i < numberOfRounds; i++) {
        let numberOfQuizzesElement = document.getElementById('number-questions-' + (i + 1));

        gameBuilder.addRound(i + 1, numberOfQuizzesElement.value);
    }

    return gameBuilder.buildGame().convertForFirebase();
}
function buildListener() {
    let game = buildGameForFirebase();
    let gameService = new GameService(DbConnection.getConnection());
    gameService.save(game).then((gameId)=>{document.location.href = '../admin/addteam.html'});
}
