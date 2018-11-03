const Match = require('../socket/Game/match');
let {
    checkAuthentication
} = require('../middleware/authenticationMiddleware');
const match = new Match();

module.exports = (app) => {

    app.get('/api/findGame', checkAuthentication, (req, res) => {
        let matchId = match.checkingForMatches();
        if (matchId === false) {
            let generetedMatch = match.genereteMatchId();
            match.printAllMatches(); 

            res.json({
                MatchIdentication: generetedMatch
            });
        } else {
            match.printAllMatches();
            res.json({
                MatchIdentication: matchId
            });
        }
    });

    app.post('/api/StartGame', checkAuthentication, (req, res) => {
        if(match.deleteMatchId(req.body.matchID)){
            res.send(200);
        }else{
            res.send(500); 
        }
    });
};