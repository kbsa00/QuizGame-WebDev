let localUser = require('../models/localUser');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

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
                    res.status(422).send();
                });
        }
    });

    
    app.post('/api/login', (req, res) => {

        let {
            username,
            password
        } = req.body;

        localUser.findOne({
            username: username
        }, (err, userInformation) => {

            if (userInformation) {
                let passwordCheck = bcrypt.compareSync(password, userInformation.password);
                
                if (passwordCheck) {
                    const jwtToken = jwt.sign({
                            email: userInformation.email,
                            username: userInformation.username,
                            userID: userInformation._id
                        },
                        keys.JWT_KEY, {
                            expiresIn: "2h"
                        });

                    res.status(200).json({
                        message: "Logged in successful",
                        token: jwtToken,
                    })
                } else {
                    res.status(401).json({
                        message: "Wrong Email or Password"
                    });
                }

            } else {
                res.status(401).json({
                    message: "Wrong Email or Password"
                });
            }
        });
    });
}
