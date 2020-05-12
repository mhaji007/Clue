const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

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

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'))


const PORT = process.env.PORT || 5000;

app.listen(PORT);




