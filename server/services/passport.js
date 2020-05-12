const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Tells passport a new strategy is available
// instantiates the new strategy and tells it how to use it
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'/auth/google/callback'
        },
        accessToken => {
            console.log(accessToken);
        }
    )
);
