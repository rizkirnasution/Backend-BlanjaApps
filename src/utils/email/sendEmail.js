require('dotenv').config()
const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
const { google } = require("googleapis");
const text = require('./templateEmail');

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI,
)

oAuth2Client.setCredentials({refresh_token : process.env.GMAIL_REFRESH_TOKEN})
const sendEmail = async ({email, fullname, token}) =>{
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken
            }
        })
        const info = await transporter.sendMail({
            from: `"Belanjain Aja" <hatakekakasih2002@gmail.com>`,
            to: email,
            subject: `Hello ✔ ${fullname}`,
            html: text(token)
          })
        console.log(info)

    } catch (error) {
        console.log(error)
    }   
}

module.exports = sendEmail;