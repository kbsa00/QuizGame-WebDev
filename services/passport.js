const passport = require('passport');
let LocalUser = require('../models/localUser');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    LocalUser.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        
        LocalUser.findOne({
            username: username
        }, (err, user) => {

            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: "User does not exist"
                });
            }

            if (user) {

                let passwordCheck = bcrypt.compareSync(password, user.password);
                if (passwordCheck) {
                   return done(null, user);
                }
                else {
                   return done(null, false,{
                      message: "Invalid Password"
                   });
                }
            }
        });
    }
));