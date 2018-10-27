const mongoose = require('mongoose'); 
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const localUserSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    password:{
        type: String, 
        required: true
    }
});
localUserSchema.pre('save', function save(next) {
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
  
        this.password = hash;
        next();
      });
    });
});

let LocalUser = mongoose.model('localuser', localUserSchema);
module.exports = LocalUser;

