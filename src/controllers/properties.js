import db from "../db"

const validateInput = (obj, resolve) => {
    if (obj.code.trim() === "" || obj.brief_description.trim() === "" || obj.property_usage_type.trim() === "" || obj.description.trim() === "" || isNaN(obj.rooms) || isNaN(obj.bathroom) || isNaN(obj.sqm) || isNaN(obj.year_built) || isNaN(obj.price) || obj.address === "") resolve({
        status: false,
        message: "All fields are required"
    });

    if (obj.price <= 0) resolve({status: false, message: "Price should be a number greater than zero"});
    if (obj.rooms <= 0) resolve({status: false, message: "Rooms should be a number greater than zero"});
    if (parseInt(obj.year_built) < 1970) resolve({status: false, message: "Year built should be a year greater than 1970"});
}
const save = (obj) => {
    let query = `INSERT INTO properties SET user_id='${obj.user_id}',code='${obj.code}',brief_description='${obj.brief_description}',property_usage_type='${obj.property_usage_type}',description='${obj.description}',photos='${obj.photos}',rooms='${obj.rooms}',bathroom='${obj.bathroom}',parking_slots='${obj.parking_slots}',sqm='${obj.sqm}',year_built='${obj.year_built}',price='${obj.price}',address='${obj.address}',status='${obj.status}'`;
    return new Promise((resolve, reject) => {
        validateInput(obj, resolve)
        if(!obj.hasOwnProperty("photos")) resolve({status:false,message:"Property photos should be provided"});
        db.query(query, (err, res) => {
            if (err) reject(err);
            resolve({status: true, message: "Property created successfully"});
        })
    })
}


const load = (id = 0) => {
    let query = "select * from properties";
    let queryId = `select * from properties where id=${id}`;
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
const loadAvailable = (usageType = "") => {
    let queryType = `select p.*,u.name,u.phone,u.email from properties p INNER JOIN users u ON u.id=p.user_id where p.status IN ("For sale","For rent")`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByType = (usageType = "") => {
    let queryType = `select * from properties where property_usage_type=${usageType}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByLandlord = (id = 0) => {
    let queryType = `select * from properties where user_id=${id}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const update = (id, obj) => {
    let queryId = `SELECT * FROM properties WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        validateInput(obj, resolve)
        db.query(queryId, (errId, resId) => {
            if (errId) reject(errId);
            console.log("data========================")
            if (resId.length > 0) {
                if (obj.photos===undefined) {
                    obj.photos = resId[0].photos;
                }else if(JSON.parse(obj.photos).length===0){
                    obj.photos = resId[0].photos;
                }
                let query = `UPDATE properties SET code='${obj.code}',brief_description='${obj.brief_description}',property_usage_type='${obj.property_usage_type}',description='${obj.description}',photos='${obj.photos}',rooms='${obj.rooms}',bathroom='${obj.bathroom}',parking_slots='${obj.parking_slots}',sqm='${obj.sqm}',year_built='${obj.year_built}',price='${obj.price}',address='${obj.address}',status='${obj.status}' WHERE id='${id}'`;
                db.query(query, (err, res) => {
                    if (err) reject(err)
                    resolve({status: true, message: "Property updated successfully"});
                })
            } else
                resolve({status: false, message: "Can not find property"});
        })
    })
}

export default {
    save,
    load,
    loadByType,
    loadByLandlord,
    loadAvailable,
    update
}