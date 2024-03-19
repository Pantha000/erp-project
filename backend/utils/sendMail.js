const nodemailer = require("nodemailer");
const { google } = require("googleapis");

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
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
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
