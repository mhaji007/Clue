const passport = require('passport');

module.exports = (app) => {

    // When request is made to this route
    // Involve password to initiate auth prcoess
    // 'google' refers to Google strategy in passport
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });
    // At this point Google has sent back a code 
    // and we have access to this code in the
    // callback url. Passport recognizes that
    // user is not trying to authenticate for the
    // first time but is trying to turn the code to an
    // actual profile. Passport sends the code
    // to Google in exchange for user's information
    //(profile, access token, refresh token, etc.)
    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    )
 
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
