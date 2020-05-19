const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

const app = express();

app.use(bodyParser.json());

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

if(process.env.NODE_ENV === 'production') {

    // Express will serve up production assets
    // like main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });

};

// Read the port from the environment variable set by Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT);
