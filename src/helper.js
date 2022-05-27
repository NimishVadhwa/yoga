const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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');

exports.sendEmail = async (to, subject, data) => {

    const msg = {
        to: to, // Change to your recipient
        from: 'websit11e@transform.vc',
        subject: subject,
        html: data,
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

exports.send_msg = async (sender, receiver, msg, msg_type,chat_type)=>{

    console.log(sender);
    console.log(receiver);
    console.log(msg);
    console.log(msg_type);
    console.log(chat_type);

}