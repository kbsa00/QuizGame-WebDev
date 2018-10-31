const bodyParser = require('body-parser');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const express = require('express');
const path = require('path');



module.exports = (app) => {
    app.use(session({
        secret: keys.COOKIE_SECRET_KEY,
        resave: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000 //Huske å endre dette fra 30 dager til 2 timer elns
        },
        saveUninitialized: false
    }));
    
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
  
    mongoose.set('useCreateIndex', true);
    mongoose.connect(keys.mongo_URI, {
        useNewUrlParser: true
    });
    
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/dist'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname,'./', 'client', 'dist', 'index.html'));
        });
    }
}