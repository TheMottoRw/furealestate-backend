import mail_utils from "../helper/mail_utils"

const send = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(process.env.MAIL_RECEIVER)
        let resp  = await mail_utils.sendEmail(obj.name,obj.subject,obj.message,obj.email)
        console.log(`Status:: ${resp}`);
        if(resp){
        resolve({status: true, message: "Message sent successfully"});
    }else{
        resolve({status:true,message:"Message sent successfully"})
    }
    })
}

export default{
    send
}