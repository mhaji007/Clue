const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
    constructor({subject, recipients}, content) {
        super();

        // Sendgrid specific setup
        // helper. s are helper functions from Sendgrid
        // library that help format from-email and body 
        // of the email
        this.from_email = new helper.Email('mhaji007@fiu.edu');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        // Trun each recipient into a helper email
        this.recipients = this.formatAddresses(recipient); 
        
        // Register the body with Email
        this.addContent(this.body);
        // Enable Sendgrid scanning function that
        // replaces every link with their own special link
        this.addClickTracking();
        // take the list of helper emails and 
        // register them with email
        this.addRecipients();

    }



    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
            
        });

        this.addPersonalization(personalize);
    }

    // Extract each email for every recipient 
    // from the objects inside the subdocument collections
    formatAddresses(recipients) {
        return recipients.map(({email})=>{
            return new helper.Email(email);

        })
    }
}

module.exports = Mailer;
