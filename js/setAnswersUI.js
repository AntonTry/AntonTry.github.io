class SetAnswers{

    constructor(resultService,gameService){
        this.resultService = resultService;
        this.gameService = gameService;
        this.game;
        this.currentRound;
        this.currentQuiz;
    }

    setResultHeader(quizNumber){
        let resultHeader = document.querySelector('#resultHeader');
        let questionField = resultHeader.querySelector('h1');
        let answerField = resultHeader.querySelector('p');
        questionField.innerHTML = 'Question #' + quizNumber;
        answerField.innerHTML = 'Answer: some answer ' + quizNumber;
    }

    createTeamInput(){
        let teamList = document.querySelector('ul');
        let template = '<li><label><input type="checkbox"></label></li>';
        teamList.innerHTML += template;
    }

    setTeamsNames(){
        let teamList = document.querySelector('ul');
        let teamsNames = JSON.parse(localStorage.getItem('teams'));
        let teamCheckBoxes = teamList.querySelectorAll('input[type=checkbox]');
        let names = [];
        teamList.querySelectorAll('label').forEach((team, index) => {
            names.push(document.createTextNode(teamsNames[index].name));
            team.insertBefore(names[index],teamCheckBoxes[index]);
        })
    }

    setGame(){
        this.gameService.getGameById(localStorage.getItem('gameId')).
        then((game) => {
            this.game = game.val();
            this.currentRound = this.game.currentRound;
            this.currentQuiz = this.game.currentQuiz;
            this.createQuizButtons(this.game.rounds[this.currentRound]);
            this.setButtonsColor();
        });
    }

    createQuizButtons(quizzesCount){
        let quizzesPanel = document.querySelector('#quizPanel');
        let button = quizzesPanel.querySelector('#quizButton');
        for (let i = 1; i <= quizzesCount; i++){
            quizzesPanel.appendChild(document.importNode(button.content,true));
        }

    }

    setButtonsColor(){
        let quizzesPanel = document.querySelector('#quizPanel');
        let buttons = quizzesPanel.querySelectorAll('button');
        buttons.forEach((button,index) =>{
            button.className = 'btn';
            button.innerHTML = index + 1;
        })
    }
}
function generatePage() {
    let databese = DbConnection.getConnection();
    let setAnswers = new SetAnswers(new ResultService(databese), new GameService(databese));
    setAnswers.setResultHeader(1);
    JSON.parse(localStorage.getItem('teams')).forEach((teamName) => {
        setAnswers.createTeamInput();
    })
    setAnswers.setTeamsNames();
    setAnswers.setGame();
}