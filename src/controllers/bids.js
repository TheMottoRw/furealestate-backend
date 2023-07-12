import db from "../db"

const save = (obj) => {
    let query = `INSERT INTO bid SET property_id='${obj.property_id}',client_id='${obj.client_id}',sale_type='${obj.sale_type}',payment_mode='${obj.payment_mode}',price='${obj.price}',contract_start='${obj.contract_start}',contract_end='${obj.contract_end}',status='${obj.status}'`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) reject(err);
            resolve({status: true, message: "Bid recorded successfully"});
        })
    })
}

const load = (id = 0) => {
    let query = "select * from bid";
    let queryId = `select * from bid where id=${id}`;
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
    let queryType = `select * from bid where client_id=${clientId}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByProperty = (propertyId = "") => {
    let queryType = `select * from bid where property_id=${propertyId}`;
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
export default {
    save,
    load,
    loadByProperty,
    loadByClient,
    update
}