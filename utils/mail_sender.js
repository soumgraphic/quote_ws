var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'diarra176@gmail.com',
        pass: 'barissa94'
    }
});

var mailOptions = {
    from: 'diarra176@gmail.com',
    to: 'soumgraphic@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome to QuoteWS ! <pThat was easy!></p></h1>'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});