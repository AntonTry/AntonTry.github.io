class GameResultParser {
    static getRoundsResult(result) {
        var rounds = {}
        result.forEach((elem) => {
            rounds[elem.round] = {};
        });
        for(key in rounds){
            let teams = {}
            result.forEach((elem) => {
                teams[elem.teamId] = {score:0};
            })
            rounds[key] = teams;
        }
        result.forEach((elem)=>{
            rounds[elem.round][elem.teamId].score+=elem.score;
        });
        var results = [];
        for(var roundKey in rounds){
            results.push({round:"Round #"+roundKey,data:(function () {
                let data = [];
                for(var teamKey in rounds[roundKey]){
                    data.push({team:teamKey,score:rounds[roundKey][teamKey].score})
                }
                return data;
            })()})
        }
        return results;
        
    }
}