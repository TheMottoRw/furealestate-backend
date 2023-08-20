import db from "../db"
import properties from "./properties";

const validateInput = (obj,resolve)=>{
    if(obj.price.trim()=="" || obj.contract_start.trim()=="" || obj.contract_end.trim()=="") resolve({status:false,message:"All fields are required"});
    if(isNaN(obj.price) || obj.price<=0) resolve({status:false,message:"Price should be a number greater than zero"});
}
const save = async (obj) => {
    console.log(new Date().toISOString().substring(0,10))
    const propertyInfo = await properties.load(obj.property_id)
    let queryExist = `SELECT * FROM bid WHERE property_id='${obj.property_id}' AND status IN ("Pending","Accepted") AND client_id='${obj.client_id}' AND contract_end >= '${new Date().toISOString().substring(0,10)}'`;
    return new Promise(async (resolve, reject) => {
        validateInput(obj,resolve)
        if (propertyInfo.length > 0) {
            obj.payment_mode = propertyInfo[0].payment_mode;

            if (obj.status === "For rent") {
                obj.sale_type = "Rent";
                obj.payment_mode = "Monthly";
            } else {
                obj.sale_type = "Sell";
                obj.payment_mode = "Once";
            }
            db.query(queryExist, async (err, res) => {
                if (err) console.log(err);
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
    let query = "select b.*,b.price as bid_price,b.status as bid_status,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id where b.status IN ('Pending','Rejected') order by b.id desc";
    let queryId = `select b.*,b.status as bid_status,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id where b.id=${id} `;
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
    let queryType = `select b.*,b.status as bid_status,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id  where b.client_id=${clientId} and b.status IN ("Pending","Rejected") order by b.id desc`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByProperty = (propertyId = "") => {
    let queryType = `select b.*,b.status as bid_status,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id where b.property_id='${propertyId}' and b.status IN ("Pending","Rejected") order by b.id desc`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadByLandlord = (landlordId = "") => {
    let queryType = `select b.*,b.status as bid_status,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name,c.phone,c.email,c.user_type from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id where p.user_id='${landlordId}' order by b.id desc`;
    return new Promise((resolve, reject) => {
        db.query(queryType, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}
const loadSoldOrRent = (user=0,type="Admin",dateObj = {}) => {
    let queryType = `select b.*,b.status as bid_status,p.code,p.brief_description,p.property_usage_type,p.description,p.photos,p.rooms,p.bathroom,p.parking_slots,p.sqm,p.year_built,p.price,p.address,p.status,c.name as client_name,c.phone as client_phone,c.email as client_email,o.name as owner_name,o.phone as owner_phone,o.email as owner_email from bid b INNER JOIN properties p ON p.id=b.property_id INNER JOIN users c ON c.id=b.client_id INNER JOIN users o ON o.id=p.user_id where b.status ='Accepted'`;
    if(type=="Landlord"){
        queryType+=` and p.user_id='${user}'`;
    }
    if(type=="Client"){
        queryType+=` and b.client_id='${user}'`;
    }
    if(dateObj.hasOwnProperty("start") && dateObj.hasOwnProperty("end")){
        queryType+= ` and b.updated_at between '${dateObj.start} 00:01' and '${dateObj.end} 23:59'`;
    }
    queryType+=` order by b.id desc`;
    console.log(queryType)
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
            if (errId) console.log(errId);
            if (resId.length > 0) {
                let query = `UPDATE bid SET status='${obj.status}' WHERE id='${id}'`;
                db.query(query,async (err, res) => {
                    if (err) console.log(res)
                    console.log(resId)
                    if(obj.status==="Accepted"){
                        // update properties to sold or rent,and reject all other bids
                        let statusUpdate = "Rent";
                        const propertyInfo = await db.query(`SELECT * FROM properties WHERE id=${resId[0].property_id}`);
                        if(propertyInfo[0].status==="For sale") statusUpdate="Sold";
                        await db.query(`UPDATE properties SET status=${statusUpdate} WHERE id=${resId[0].property_id}`)
                        await db.query(`UPDATE bid SET status='Rejected' WHERE property_id=${resId[0].property_id} AND status='Pending'`)
                    }
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
    loadByLandlord,
    update,
    rejectOrApprove,
    loadSoldOrRent
}