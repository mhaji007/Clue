const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

const app = express();

// Enable cookies
app.use(
    //  configuration object
    cookieSession({
        maxAge:30*24*60*60*1000, // 30 days in miliseconds
        keys: [keys.cookieKey] // keys to encrypt cookies
    })
);

//Tells express to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Read the port from the environment variable set by Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT);
