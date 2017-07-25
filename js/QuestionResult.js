let round = document.querySelector('.round');
let quiz = document.querySelector('.quiz');

let myTable = document.querySelector('.my-table');

let con = DbConnection.getConnection();
let gameService = new GameService(con);
let resService = new ResultService(con);
let teamService = new TeamService(con);

let gameId = localStorage.getItem('gameId');

let currQuiz = gameService.getCurrentQuiz(gameId);
let currRound = gameService.getCurrentRound(gameId);

let scoreResultName;
let teams = {};
var currRoundNum;
var currQuizNum;

Promise.all([currRound,currQuiz]).then(value =>{
    currRoundNum = value[0].val();
    currQuizNum = value[1].val();
    round.innerText += currRoundNum;
    quiz.innerText += currQuizNum;
    resService.getByRoundAndQuiz(currRoundNum,currQuizNum,gameId).then(
        result => {
            Object.values(result).forEach(res=>{
                teams[res.TeamID] = res.score;
            });
            for(let [teamID,score] of Object.entries(teams)){
                teamService.getById(teamID)
                    .then(team=>{
                        if (score>0) scoreResultName = 'check';
                        else scoreResultName = 'times';
                        myTable.innerHTML +=`<div class="my-row">
                                      <li>${team.name}<i class="fa fa-${scoreResultName}"></i></li>
                                 </div>` ;
                    })
            }
        }
    );

});

function onClickedNext() {
    let next = new NextQuizz(gameService, currRoundNum, currQuizNum);
    next.nextPage();
}

