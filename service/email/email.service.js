const nodemailer = require("nodemailer");
const EmailTemplates = require('email-templates');
const path = require('path');

const {ROOT_EMAIL_SERVICE, ROOT_EMAIL, ROOT_EMAIL_PASSWORD, FRONTEND_URL} = require("../../config");
const htmlTemplates = require("../../email-templates");


const transporter = nodemailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates/')
    }
})

class EmailService {
    async sendMail(userMail, action, context) {
        try {
            const html = await emailTemplates.render(
                htmlTemplates[action].templateFileName,
                {...context, frontendUrl: FRONTEND_URL}
                )

            const mailOptions = {
                from: 'Crazy girl',
                to: userMail,
                subject: htmlTemplates[action].subject,
                html
            }

            return transporter.sendMail(mailOptions)
        } catch (e) {
            console.log(e);
        }

    }
}
module.exports = new EmailService();
