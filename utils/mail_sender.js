var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        //Mon mail
        user: '**************',
        // Mon mot de passe
        pass: '*******'
    }
});

var mailOptions = {
    //De quel mail
    from: '*******************',
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