const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('../config/keys');
const mongoose = require('mongoose');



module.exports = (app) => {
   

    app.use(bodyParser.json());
    app.use(passport.initialize());

    mongoose.set('useCreateIndex', true);
    mongoose.connect(keys.mongo_URI, {
        useNewUrlParser: true
    });
}