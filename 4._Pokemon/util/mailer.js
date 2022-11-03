import nodemailer from "nodemailer";

let _transporter;

// lazy load transporter, use env vars
const transporter = ()=>{
    if (_transporter) {
        return _transporter;
    } else {
        _transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 25,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
        });
        return _transporter;
    }
};

export const sendMail = (name, from, message)=>{
    const mail = {
        from: from,
        to: "myemail@pokemon.dev",
        subject: `From ${name} (contactform)`,
        text: message,
    };
    return transporter().sendMail(mail);
};