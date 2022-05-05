const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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');

exports.sendEmail = async (to, subject, data) => {

    const msg = {
        to: to, // Change to your recipient
        from: 'websit11e@transform.vc',
        subject: subject,
        html: 'asdf',
    }

    console.log(to);

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((err) => {
            err.status = 404;
            console.log(
                'Emailerror=================' + err
            );
            // next(err);
        });

}