import db from "../db"
import validators from "../helper/validators";
const validateInput = (obj,resolve)=>{
    if(obj.message.trim()==="") resolve({status:false,message:"Message should not be empty"});
    if(isNaN(obj.user_id)) resolve({status:false,message:"Reviewer not found"});
    if(isNaN(obj.property_id)) resolve({status:false,message:"Property not found"});
}
const save = (obj) => {
    let query = `INSERT INTO reviews SET user_id='${obj.user_id}',property_id='${obj.property_id}',message='${obj.message}'`;
    return new Promise((resolve, reject) => {
        validateInput(obj,resolve)
        db.query(query, (err, res) => {
            if (err) reject(err);
            resolve({status: true, message: "Review sent successfully"});
        })
    })
}

const load = (id = 0) => {
    let query = "select reviews.*,u.name,p.code from reviews INNER JOIN users u ON u.id=reviews.user_id INNER JOIN properties p ON p.id=reviews.property_id";
    let queryId = `select * from reviews where id=${id}`;
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
const loadByProperty = (propertyId = "") => {
    let queryType = `select reviews.*,u.name,p.code from reviews INNER JOIN users u ON u.id=reviews.user_id INNER JOIN properties p ON p.id=reviews.property_id where reviews.property_id=${propertyId}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const update = (id, obj) => {
    let queryId = `SELECT * FROM reviews WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        db.query(queryId, (errId, resId) => {
            console.log(errId)
            if (errId) reject(errId);
            if (resId.length > 0) {
                let query = `UPDATE reviews SET user_id='${obj.user_id}',property_id='${obj.property_id}',message='${obj.message}' WHERE id='${id}'`;
                db.query(query, (err, res) => {
                    if (err) reject(res)
                    resolve({status: true, message: "Review updated successfully"});
                })
            } else
                resolve({status: false, message: "Can not find review"});
        })
    })
}

export default {
    save,
    load,
    loadByProperty,
    update
}