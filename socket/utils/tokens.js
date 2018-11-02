const crypto = require('crypto');
let queue = require('../Game/queue.js'); 

let userTokens = new Map();

const genereteToken = (userId) =>{
    const token = crypto.randomBytes(10).toString;
    userTokens.set(userId, token);
    console.log(`Usertokens ${userTokens}`); 
    queue.AddingUserToTheQueue(userId);
    return token;
}

const deleteToken = (userId) => {
    if (userTokens.get(userId)) {
        userTokens.delete(userId);
        return true
    } else {
        return false;
    }
}

module.exports = {
    genereteToken,
    deleteToken
};
