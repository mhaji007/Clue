const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Tells passport a new strategy is available
// instantiates the new strategy and tells it how to use it
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).
            then((existingUser) => {
                if(existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record
                    new User({googleId: profile.id}).save().then(user=>done(null, user));
                }
            })
        }
    )
);