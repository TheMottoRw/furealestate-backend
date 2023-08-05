import db from "../db"
import properties from "./properties";

const save = async (obj) => {
    console.log(new Date().toISOString().substring(0,10))
    const propertyInfo = await properties.load(obj.property_id)
    let queryExist = `SELECT * FROM bid WHERE property_id='${obj.property_id}' AND client_id='${obj.client_id}' AND contract_end >= '${new Date().toISOString().substring(0,10)}'`;

    return new Promise(async (resolve, reject) => {
        if (propertyInfo.length > 0) {
            obj.payment_mode = propertyInfo[0].payment_mode;
            obj.price = propertyInfo[0].price;

            if (obj.status === "For rent") {
                obj.sale_type = "Rent";
                obj.payment_mode = "Monthly";
            } else {
                obj.sale_type = "Sold";
                obj.payment_mode = "Once";
            }
            db.query(queryExist, async (err, res) => {
                if (err) reject(err);
                console.log(res.length);
                if (res.length > 0) {
                    let queryUpdate = `UPDATE bid SET property_id='${obj.property_id}',client_id='${obj.client_id}',sale_type='${obj.sale_type}',payment_mode='${obj.payment_mode}',price='${obj.price}',contract_start='${obj.contract_start}',contract_end='${obj.contract_end}' WHERE id='${res[0].id}'`;
                    db.query(queryUpdate, (err, res) => {
                        if (err) reject(err);
                        resolve({status: true, message: "Bid updated successfully"});
                    })
                } else {
                    let query = `INSERT INTO bid SET property_id='${obj.property_id}',client_id='${obj.client_id}',sale_type='${obj.sale_type}',payment_mode='${obj.payment_mode}',price='${obj.price}',contract_start='${obj.contract_start}',contract_end='${obj.contract_end}'`;
                    db.query(query, (err, res) => {
                        if (err) reject(err);
                        resolve({status: true, message: "Bid recorded successfully"});
                    })
                }
            })
        } else {
            resolve({status: false, message: "Property id does not exist"})
        }
    })
}

const load = (id = 0) => {
    let query = "select b.*,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id";
    let queryId = `select b.*,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id where b.id=${id} `;
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
const loadByClient = (clientId = "") => {
    let queryType = `select b.*,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id  where b.client_id=${clientId}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByProperty = (propertyId = "") => {
    let queryType = `select b.*,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id where b.property_id=${propertyId}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const update = (id, obj) => {
    let queryId = `SELECT * FROM bid WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        db.query(queryId, (errId, resId) => {
            console.log(errId)
            if (errId) reject(errId);
            if (resId.length > 0) {
                let query = `UPDATE bid SET property_id='${obj.property_id}',client_id='${obj.client_id}',sale_type='${obj.sale_type}',payment_mode='${obj.payment_mode}',price='${obj.price}',contract_start='${obj.contract_start}',contract_end='${obj.contract_end}',status='${obj.status}' WHERE id='${id}'`;
                db.query(query, (err, res) => {
                    if (err) reject(res)
                    resolve({status: true, message: "Bid updated successfully"});
                })
            } else
                resolve({status: false, message: "Can not find property"});
        })
    })
}
const rejectOrApprove = (id, obj) => {
    let queryId = `SELECT * FROM bid WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        db.query(queryId, (errId, resId) => {
            console.log(errId)
            if (errId) reject(errId);
            if (resId.length > 0) {
                let query = `UPDATE bid SET status='${obj.status}' WHERE id='${id}'`;
                db.query(query, (err, res) => {
                    if (err) reject(res)
                    resolve({status: true, message: "Order updated successfully"});
                })
            } else
                resolve({status: false, message: "Can not find property"});
        })
    })
}
export default {
    save,
    load,
    loadByProperty,
    loadByClient,
    update,
    rejectOrApprove
}