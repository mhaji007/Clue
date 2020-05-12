const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Tells passport a new strategy is available
// instantiates the new strategy and tells it how to use it
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;

app.listen(PORT);




