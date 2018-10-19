const jwt = require('jsonwebtoken');
const keys = require('../config/keys'); 

module.exports = (req, res, next) => {
    try{
        const decodeToken = jwt.verify(req.body.token, keys.JWT_KEY);
        req.userInfo = decodeToken;
        next();
    }catch(err){
        return res.status(401).json({
            message: 'not a valid token'
        })
    }
};