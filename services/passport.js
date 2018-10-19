const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = mongoose.model('GoogleUser');;


//Creating a cookie for the user. 
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((obj, id, done) => {
    GoogleUser.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google_clientID,
        clientSecret: keys.google_clientsecretID,
        callbackURL: '/auth/google/callback',
        proxy: true

    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await GoogleUser.findOne({
            googleId: profile.id,
            token: accessToken
        });

        if (existingUser) { 
            return done(null, existingUser);
        }
        
        const user = await new GoogleUser({
            googleId: profile.id
        }).save()
        done(null, user);
    })
);

