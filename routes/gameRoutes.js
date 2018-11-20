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
            let matchCreator = match.getPartyLeaderMatch(generetedMatch);
            res.json({
                MatchIdentication: generetedMatch,
                PartyLeader: matchCreator
            });
        } else {
            let matchCreator = match.getPartyLeaderMatch(matchId)
            res.json({
                MatchIdentication: matchId,
                PartyLeader: matchCreator
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

    app.post('/api/checkGameExist', checkAuthentication, (req,res) => {
        let matchtoken = req.body.MatchIdentication;
        matchtoken = matchtoken.substring(1);

        let answer = match.checkMatchExist(matchtoken);
    
        if(answer){
            res.json({
                matchtoken: matchtoken
            });
        }else{
            res.status(401).send();
        }
    });

    app.post('/api/endgame', checkAuthentication, (req,res) => {
        let matchtoken = req.body.MatchIdentication; 
        let done = match.deleteOngoinMatch(matchtoken);
        if(done){
            res.status(200).send();
        }
    }); 
};