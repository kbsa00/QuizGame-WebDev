let localUser = require('../models/localUser');
const passport = require('passport');
let {checkAuthentication} = require('../middleware/authenticationMiddleware');

module.exports = (app) => {
    
    app.post('/api/register', (req, res) => {
        if (req.body.email && req.body.password && req.body.username) {
            new localUser({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })
                .save()
                .then(user => {
                    res.status(200).send();
                })
                .catch(err => {
                    res.status(500).send();
                });
        }else{
            res.status(422).send();
        }
    });

    app.post(
        "/api/login",
        passport.authenticate('local'), (req, res) => {
            if (req.user) {
                res.json({
                    userId: req.user.id,
                    username: req.user.username
                });
            }

            res.status(401).send();
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.status(200).clearCookie('connect.sid', {
            path: '/'
          });
          req.session.destroy(function (err) {
            res.redirect('/');
          });
    });

    app.get('/api/current_user', checkAuthentication, (req, res) => { 
        res.json({
            userId: req.user.id,
            username: req.user.username
        });
    });
}