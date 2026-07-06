const nodemailer = require("nodemailer");

const mail_User = process.env.MAIL_KEY;
const mail_Pass = process.env.MAIL_PASS;

async function sendMail(option) {
  let emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mail_User,
      pass: mail_Pass,
    },
  });

  const mailOptions = {
    from: "Job Portal - <jobportal@gmail.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await emailTransporter.sendMail(mailOptions);
}

module.exports = sendMail;
