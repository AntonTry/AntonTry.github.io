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
    round.innerText += value[0].val();
    quiz.innerText += value[1].val();
    resService.getByRoundAndQuiz(value[0].val(),value[1].val(),'-Kp_0ALYMVWz1hw8meC9').then(
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



