const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Take user pulled out of database
// turn user model into id
passport.serializeUser((user,done)=>{
    // user.id here is NOT the profile.id coming from Google.
    // This is the unique identifier generated by Mongo
    // user.id is a shortcut reference to user._id.$oid
    done(null, user.id);
});
// turn id in cookie into user model
passport.deserializeUser((id, done)=>{
    User.findById(id).then(user => {
        done(null, user);
    });

});

// Tells passport a new strategy is available
// instantiates the new strategy and tells it how to use it
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy: true
        },
        // Once google authenticates and exchange of code wtih profile
        // takes place and we are sent back to server,
        // at callback url we have access to user profile
        async (accessToken, refreshToken, profile, done) => {
            // create a user record in database
            const existingUser = await User.findOne({googleId: profile.id});

                if(existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record
                    const user = await new User({googleId: profile.id}).save();
                    done(null, user);
                }
            }
            )
        
    );
