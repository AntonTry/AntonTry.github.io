let round = document.querySelector('.round');
let quiz = document.querySelector('.quiz');

let myTable = document.querySelector('.my-table');

let con = DbConnection.getConnection();
let gameService = new GameService(con);
let resService = new ResultService(con);
let teamService = new TeamService(con);

let currQuiz = gameService.getCurrentQuiz('-Kp_0ALYMVWz1hw8meC9');
let currRound = gameService.getCurrentRound('-Kp_0ALYMVWz1hw8meC9');

let scoreResultName;
let teams = {};

Promise.all([currRound,currQuiz]).then(value =>{
    let currRoundNum = value[0].val();
    let currQuizNum = value[1].val();
    round.innerText += currRoundNum;
    quiz.innerText += currQuizNum;
    resService.getByRoundAndQuiz(currRoundNum,currQuizNum,'-Kp_0ALYMVWz1hw8meC9').then(
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



