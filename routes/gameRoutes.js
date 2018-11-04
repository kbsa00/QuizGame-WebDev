const Match = require('../socket/Game/match');
let {
    checkAuthentication
} = require('../middleware/authenticationMiddleware');
const match = new Match();

module.exports = (app) => {

    app.get('/api/findGame', checkAuthentication, (req, res) => {
        
        let matchId = match.checkingForMatches();
        if (matchId === false) {
            let generetedMatch = match.genereteMatchId(req.user.username);
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

    app.post('/api/startGame', checkAuthentication, (req, res) => {
        if(match.StartingMatch(req.body.MatchIdentication, req.user.username)){
            res.status(200).send(); 
        }else{
            res.json({
                errormsg: "Wait for the Party-Leader to start the game!"
            }); 
        }
    });
};