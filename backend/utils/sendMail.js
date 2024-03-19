const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const REFRESH_TOKEN =
  "1//04VTN7yItJYGnCgYIARAAGAQSNwF-L9IrMz_A0G2pVqBsgDV6TmiRa4x2b95t9bZP7q1vuHcX6u9XZvy3OJCb6TC0ijh7DUfaCOo";
const CLIENT_ID =
  "448514247810-dbo8o1q7vbhni038tsjqu1c2lr3q3r3b.apps.googleusercontent.com";
const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (options) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transpoter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        type: "OAuth2",
        user: "soulpark0@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOption = {
      from: process.env.MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    await transpoter.sendMail(mailOption);
  } catch (err) {
    console.log(err);
  }
};
module.exports = sendMail;
