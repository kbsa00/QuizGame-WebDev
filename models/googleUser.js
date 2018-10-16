const mongoose = require('mongoose'); 

const googleuserSchema = new mongoose.Schema({
    googleId: String
});

mongoose.model('GoogleUser', googleuserSchema);
