const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const localUserSchema = new Schema({
    username:{
        type: String,
        required: true
    }, 
    password:{
        type: String, 
        required: true
    }
});

mongoose.model('localuser', localUserSchema); 
