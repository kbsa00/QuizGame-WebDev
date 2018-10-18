const passport = require('passport');
let localUser = require('../models/localUser');
const bcrypt = require('bcryptjs');


module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'), (req, res) => {
            res.redirect('/');
        }
    );

    app.get('/api/current_user', (req, res) => {
       res.send(req.user); 
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    /** 
    app.post('/register', (req, res) => {

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
                    res.status(422).send();
                });
        }
    });


    app.post('/login', (req, res) => {
        let {username, password} = req.body;

        localUser.findOne({username: username}, (err, userInformation) => {
            if (!err) {
                let passwordCheck = bcrypt.compareSync(password, userInformation.password);
                if (passwordCheck) {
                    req.session.user = {
                        username: userInformation.username,
                        password: userInformation.password
                    };

                    req.session.user.expires = new Date(
                        Date.now() + 3600 * 60 * 1000
                    );
                    req.session.user.cookie = req.session.expires; 
                    res.status(200).send('Logget inn');
                } else {
                    res.status(401).send('Wrong')
                }
            }
        });

        console.log(req.session.user);

    });
    */
    
}