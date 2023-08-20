import mail_utils from "../helper/mail_utils"
const validateInput = (obj,resolve)=>{
    if(obj.name.trim()==="" || obj.subject.trim()==="" || obj.message.trim()==="") resolve({status:false,message:"All fields are required"});
}
const send = (obj) => {
    return new Promise(async (resolve, reject) => {
        validateInput(obj,resolve);
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