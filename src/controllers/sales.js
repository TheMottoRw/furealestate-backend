import db from "../db"

const save = (obj) => {
    let queryBid = `SELECT * FROM bid WHERE id='${obj.id}'`
    return new Promise((resolve, reject) => {
       db.query(queryBid, (err, res) => {
           if(err) console.log(err);
            let saleType="";
           if (res.length > 0) {
                let bidInfo = res[0];
                if(bidInfo.sale_type=='Sell'){
                    saleType = "Sold";
                }else{
                    saleType = "Rent";
                }
                let query = `INSERT INTO sales SET property_id='${bidInfo.property_id}',client_id='${bidInfo.client_id}',sale_type='${saleType}',payment_mode='${bidInfo.payment_mode}',price='${bidInfo.price}',contract_start='${bidInfo.contract_start.toISOString().substring(0,10)}',contract_end='${bidInfo.contract_end.toISOString().substring(0,10)}',status='${obj.status}'`;
                if (err) reject(err);
                db.query(query,(err, res)=>{
                    if(err) console.log(err);
                });

                let queryUpdateBid = `UPDATE bid SET status='Accepted' WHERE id='${bidInfo.property_id}'`;
               db.query(queryUpdateBid,(err, res)=>{
                   if(err) console.log(err);
               });
                let queryUpdateProperty = `UPDATE properties SET status='${obj.status}' WHERE id='${obj.id}'`;
               db.query(queryUpdateProperty,(err, res)=>{
                   if(err) console.log(err);
               });

                resolve({status: true, message: "Sale recorded successfully"});
            }else{
               resolve({status:false,message:"Can not find order informaton"});
           }
    })
    })
}

const load = (id = 0) => {
    let query = "select * from sales";
    let queryId = `select * from sales where id=${id}`;
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
    let queryType = `select * from sales where client_id=${clientId}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByProperty = (propertyId = "") => {
    let queryType = `select * from sales where property_id=${propertyId}`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const update = (id, obj) => {
    let queryId = `SELECT * FROM sales WHERE id='${id}'`;
    return new Promise((resolve, reject) => {
        db.query(queryId, (errId, resId) => {
            console.log(errId)
            if (errId) reject(errId);
            if (resId.length > 0) {
                let query = `UPDATE sales SET property_id='${obj.property_id}',client_id='${obj.client_id}',sale_type='${obj.sale_type}',payment_mode='${obj.payment_mode}',price='${obj.price}',contract_start='${obj.contract_start}',contract_end='${obj.contract_end}',status='${obj.status}' WHERE id='${id}'`;
                db.query(query, (err, res) => {
                    if (err) reject(res)
                    resolve({status: true, message: "Sale updated successfully"});
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