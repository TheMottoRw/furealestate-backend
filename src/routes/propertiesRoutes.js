import express from "express";
import properties from "../controllers/properties";
import multer from "multer";
const propertyRouter = express.Router();

const upload = multer({dest: 'src/uploads/'});
const uploadResponse = upload.array("photos");
propertyRouter.post("/property",async (req,res)=>{
    const upload = multer({dest: 'uploads/'});
    uploadResponse(req, res,async function (err) {
        if (err) {
            // console.log(err);
            res.json({status: false, message: "Property photos should be provided"})
        }
        if (!err) {
            // it's all fine,do whatever
            req.body.photos = JSON.stringify(req.files);
            const response = await properties.save(req.body);
            res.send(response);
        }
    })
})
propertyRouter.get("/properties",async (req,res)=>{
    const response = await properties.load();
    res.send(response);
})
propertyRouter.get("/available/properties",async (req,res)=>{
   const response = await properties.loadAvailable();
    res.send(response);
})
propertyRouter.get("/property/:id",async (req,res)=>{
    const response = await properties.load(req.params.id);
    res.send(response);
})
propertyRouter.get("/property/type",async (req,res)=>{
    const response = await properties.loadByType(req.query.type);
    res.send(response);
})
propertyRouter.get("/property/owner/:id",async (req,res)=>{
    const response = await properties.loadByLandlord(req.params.id);
    res.send(response);
})
propertyRouter.post("/property/:id",async (req,res)=>{

    uploadResponse(req, res,async function (err) {
        if (err) {
            // console.log(err);
            const response = await properties.update(req.params.id,req.body);
            res.json(response)
        }
        if (!err) {
            // it's all fine,do whatever
            console.log(req.files);
            req.body.photos = JSON.stringify(req.files);
            const response = await properties.update(req.params.id,req.body);
            res.send(response);
        }
    })
})

export default propertyRouter;