class SetAnswers{

    constructor(resultService,gameService){
        this.resultService = resultService;
        this.gameService = gameService;
        this.game;
        this.currentRound;
        this.currentQuiz;
    }

    setResultHeader(){
        let resultHeader = document.querySelector('#resultHeader');
        let questionField = resultHeader.querySelector('h1');
        let answerField = resultHeader.querySelector('p');
        questionField.innerHTML = 'Question #' + this.currentQuiz;
        answerField.innerHTML = 'Answer: some answer ' + this.currentQuiz;
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
            this.setResultHeader();
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
            if(index < this.currentQuiz -1){
                button.className = "btn btn-success";
            }
            else if(index == this.currentQuiz - 1){
                button.className = "btn btn-info";
            }
            else if(index > this.currentQuiz - 1){
                button.className = "btn";
            }
            button.innerHTML = index +1;
        })




    }
}
var databese = DbConnection.getConnection();
var setAnswer = new SetAnswers(new ResultService(databese), new GameService(databese));

function generatePage() {
    JSON.parse(localStorage.getItem('teams')).forEach((teamName) => {
        setAnswer.createTeamInput();
    })
    setAnswer.setTeamsNames();
    setAnswer.setGame();
}

function onClickedNext(){
    let next = new NextQuizz(setAnswer.gameService, setAnswer.currentRound, setAnswer.currentQuiz);
    next.nextPage();
}