const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('../config/keys');
const mongoose = require('mongoose');


module.exports = (app) => {
    app.use(cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookie_key]
        })
    );
    
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    
    if(process.env.NODE == 'production'){
        app.use(express.static('client/build'))
      
        const path = require('path')
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
        });
    }
      
    mongoose.connect(keys.mongo_URI, {
        useNewUrlParser: true
    });
}