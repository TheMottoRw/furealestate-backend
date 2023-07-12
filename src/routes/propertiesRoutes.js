import express from "express";
import properties from "../controllers/properties";
const propertyRouter = express.Router();

propertyRouter.post("/property",async (req,res)=>{
    const response = await properties.save(req.body);
    res.send(response);
})
propertyRouter.get("/properties",async (req,res)=>{
    const response = await properties.load();
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
propertyRouter.post("/property/:id",async (req,res)=>{
    const response = await properties.update(req.params.id,req.body);
    res.send(response);
})
export default propertyRouter;