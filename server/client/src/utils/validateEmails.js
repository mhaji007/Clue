const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default(emails) => {
    // Igonre any trailing commas so it does not think there is any empty emails
    emails = emails.replace(/,\s*$/, '');
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false)

    if (invalidEmails.length) {
        const addSpacing = invalidEmails.map(email => " " + email);
        return `These emails are invalid:${addSpacing}`;

    }
    return;
}