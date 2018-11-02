let tokens = require('../socket/utils/tokens'); 
let {checkAuthentication} = require('../middleware/authenticationMiddleware'); 


module.exports = (app) =>{

    app.post('/webSocketsLogin', checkAuthentication, (req, res) => {
        tokens.genereteToken(req.user.username);
        res.status(200);
    });
};