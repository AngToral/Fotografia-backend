const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');

const brevo = new TransactionalEmailsApi();
brevo.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

module.exports = { brevo, SendSmtpEmail };