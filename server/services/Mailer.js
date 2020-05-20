const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
    constructor({subject, recipients}, content) {
        super();

        //Sendgrid specific setup
        this.from_email = new helper.Email('mhaji007@fiu.edu');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipient); 

    }
}

Module.exports = Mailer;
