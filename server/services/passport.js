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
        callbackURL:'/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // create a user record in database
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


// 6WDTH4V6dTJqFyvM

//mongodb+srv://mhaji007prod:<password>@cluster0-1pzrn.mongodb.net/test?retryWrites=true&w=majority

// CLient ID: 59091517968-0q9okco7mtldhff7jgmasai722epl553.apps.googleusercontent.com

//Client Secret: rtlKwKc9Pb_7VpBX7IZpGdv7