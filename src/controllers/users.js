import db from "../db"
import validators from "../helper/validators";
const validateInput = (obj,resolve)=>{
    console.log(obj)
    if(obj.hasOwnProperty("name")===undefined || obj.hasOwnProperty("email")===undefined || obj.hasOwnProperty("phone")===undefined) resolve({status:false,message:"All fields are required"});
    if(obj.name==="" || obj.email==="" || obj.phone==="") resolve({status:false,message:"All fields are required"});
    const emailValidation = validators.validateEmailAddress(obj.email.trim());
    const phoneValidation = validators.validateRwandanPhoneNumber(obj.phone.trim())
    if(!emailValidation.status) resolve(emailValidation)
    if(!phoneValidation.status) resolve(phoneValidation)

}

const save = (obj) => {
    console.log(obj)
    return new Promise((resolve, reject) => {
        validateInput(obj,resolve);
        let query = `INSERT INTO users SET name='${obj.name}',phone='${obj.phone}',email='${obj.email}',user_type='${obj.user_type}',password='${obj.password}'`;
        db.query(query, (err, res) => {
            if (err) reject(err);
            resolve({status: true, message: "User account created successfully"});
        })
    })
}

const load = (id = 0) => {
    let query = "select * from users";
    let queryId = `select * from users where id=${id}`;
    return new Promise((resolve, reject) => {
        if (id === 0) {
            db.query(query, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        } else {
            db.query(queryId, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        }
    })
}
const loadByType = (userType = "") => {
    let queryType = `select * from users where user_type=${userType}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const update = (id, obj) => {
    let queryId = `SELECT * FROM users WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        validateInput(obj,resolve);
        db.query(queryId, (errId, resId) => {
            console.log(errId)
            if (errId) reject(errId);
            if (resId.length > 0) {
                let query = `UPDATE users SET name='${obj.name}',phone='${obj.phone}',email='${obj.email}',user_type='${obj.user_type}' WHERE id='${id}'`;
                db.query(query, (err, res) => {
                    if (err) reject(res)
                    resolve({status: true, message: "User updated successfully"});
                })
            } else
                resolve({status: false, message: "Can not find user"});
        })
    })
}

const login = (obj) => {
    let query = `SELECT id,name,phone,email,user_type,created_at FROM users WHERE (phone='${obj.username}' or email='${obj.username}') AND password='${obj.password}'`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) reject(err);
            if (res.length == 0)
                resolve({status: false, message: "Wrong username or password"})
            resolve({status: true, data: res});
        })
    })
}
export default {
    save,
    load,
    loadByType,
    update,
    login
}