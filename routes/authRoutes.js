const passport = require('passport'); 

module.exports = (app) => {
    
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'), (req, res) =>{
         res.redirect('/');
        }
    );
    
    app.get('/api/current_user', (req, res) =>{
        console.log(req.user)
    }); 

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/', (req, res) => {
        res.send('heheh')
    });
}