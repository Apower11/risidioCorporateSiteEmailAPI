"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors = require('cors');
app.use(cors());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    pool: true,
    host: "uk77.siteground.eu",
    secureConnection: false,
    port: 465,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.A1,
        pass: process.env.A2
    }
});
transporter.verify((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready to Send");
    }
});
app.post("/contact", (req, res) => {
    console.log('Hello');
    const mailOptions = {
        from: process.env.A1,
        to: process.env.A4,
        subject: `${req.body.name} sent you a message from the Risidio Contact Form!`,
        text: `${req.body.message}`,
        html: `<div style="margin: 20px; text-align: left; border: solid 1px grey; border-radius: 5px; padding: 20px;">
              <h3 style="text-align: center;">You recieved a new project idea from your Risidio Form </h3>
              <hr style="margin: 20px; color: grey;"/>
              <br/>
              <h3>Name:</h3>
              <p>${req.body.name}</p>
              <h3>Email:</h3>
              <p>${req.body.email}</p>
              <h3>Subject:</h3>
              <p>${req.body.subject}</p>
              <h3>Message below:</h3>
              <p>${req.body.message}</p>
            </div>` // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
            res.json({ status: 'Request Failed', emailSent: false });
        }
        else {
            console.log('Message sent: ' + info.response);
            res.json({ status: "Email sent", emailSent: true });
        }
    });
});
app.post("/subscribe", (req, res) => {
    const mailOptions = {
        from: process.env.A1,
        to: process.env.A3,
        subject: `${req.body.name} has chosen to subscribe to Risidio's Community!`,
        text: `${req.body.name} has chosen to subscribe to Risidio's Community!`,
        html: `<div style="margin: 20px; text-align: left; border: solid 1px grey; border-radius: 5px; padding: 20px;">
              <h3 style="text-align: center;">You recieved a new subscription from your Risidio Form </h3>
              <hr style="margin: 20px; color: grey;"/>
              <br/>
              <h3>Name:</h3>
              <p>${req.body.name}</p>
              <h3>Email:</h3>
              <p>${req.body.email}</p>
            </div>` // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
            res.json({ status: 'Request Failed', emailSent: false });
        }
        else {
            console.log('Message sent: ' + info.response);
            res.json({ status: "Email sent", emailSent: true });
        }
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=main.js.map