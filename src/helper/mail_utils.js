import nodemailer from "nodemailer"

async function sendEmail(senderName,subject,message,replyTo){
    console.log("sending email")
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_SENDER,
            pass: process.env.MAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: senderName,
        replyTo: replyTo,
        to: process.env.MAIL_RECEIVER,
        subject: subject,
        html: message
    }
    await transporter.sendMail(mailOptions,function (err,info){
        if(err){
            console.log(err)
        }else{
            console.log(info.status)
            console.log("Email sent :"+info.response)
            return info.status;
        }
    })
    console.log("email sender execution done")

}

export default {
    sendEmail
}