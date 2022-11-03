import { Router } from "express";
import { sendMail } from "../util/mailer.js";
const router = Router();

router.post("/api/contact", async (req, res) => {
    // grab form params and send mail
    let { name, from, message } = req.body;
    let info = await sendMail(name, from, message);
    let redirect, resMsg;
    // check if the mail is accepted by the SMTP server
    if (info.accepted.includes(process.env.ADMIN_MAIL)) {
        redirect = "/";
        resMsg = "Thanks for your feedback, redirecting to frontpage in 3 seconds...";
    } else {
        redirect = "/contact";
        resMsg = "Something went wrong, redirecting back to contact page...";
    }
    const html = `<meta http-equiv = "refresh" content = "3; url = ${redirect}" /><h3>${resMsg}</h3>`;
    res.send(html);
});

export default router;