const _ = require("lodash");
const Path = require('path-parser');
const { URL } = require("url");
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');



const Survey = mongoose.model('surveys');



module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
       const surveys = await Survey.find({_user: req.user.id});

       res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });
    
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = Path.createPath('/api/surveys/:surveyId/:choice');
        
    _.chain((req.body))
        .map(({email, url}) => {
                const match = p.test(new URL(url).pathname)
                if(match) {
                    return {email, surveyId: match.surveyId, choice: match.choice};

                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({surveyId, email, choice}) => {

                // Go into the entire collection and find the survey
                // go through all the different subdocuments and 
                // find the one that matches the criterion
                // then update that inside Mongo DB withoout
                // loading it into the express server

                Survey.updateOne({
                    _id:surveyId,
                    recipients: {
                        $elemMatch: {email: email, responded: false}
                    }
                }, {
                    
                    // using key $inc operator 
                    // and interpolation find 
                    // the value of choice and add one to it
                    $inc: {[choice]: 1}, 

                    // look at the recipients sub documents
                    // and find the appropriate recipients
                    // that was found in the original query
                    // above and update the responded to true
                    $set : {'recipients.$.responded': true},
                    lastResponded: new Date()

                }).exec();

            })
            .value(); 

        res.send({});
    });
    
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

        const {title, subject, body, recipients} = req.body;

        // Make an instance of the survey in memory
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map (email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()

        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        try {
        await mailer.send();
        await survey.save();
        req.user.credits-= 1;
        const user = await req.user.save();

        res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};