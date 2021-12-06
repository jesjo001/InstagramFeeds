import nodemailer from 'nodemailer';


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_HOST_USERNAME,
        pass: process.env.MAIL_HOST_PASSWORD,
    },
    secure: true,
});

export const sendMail = (from, to, subject, text, html) => {

    const mailData = {
        from: from,  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

}
