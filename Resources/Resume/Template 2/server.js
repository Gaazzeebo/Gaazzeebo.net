const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const twilioClient = twilio('your-twilio-account-sid', 'your-twilio-auth-token');

app.post('/submit', (req, res) => {
    const { name, email, phone, projectType, description, hours, price } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'jwliselli@gmail.com',
        subject: 'New Project Request',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Project Type: ${projectType}
            Description: ${description}
            Estimated Hours: ${hours}
            Estimated Price: $${price}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        }
    });

    const message = `
        New Project Request:
        Name: ${name}
        Phone: ${phone}
        Project Type: ${projectType}
        Estimated Price: $${price}
    `;

    twilioClient.messages.create({
        body: message,
        from: '+12345678901',  // Your Twilio number
        to: '+13038838361'
    }).then(message => {
        console.log('Message sent:', message.sid);
        res.status(200).send('Request submitted successfully');
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error sending text message');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
