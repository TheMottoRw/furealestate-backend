import express from "express";
import bids from "../controllers/bids";
const bidRouter = express.Router();

bidRouter.post("/bid",async (req,res)=>{
    const response = await bids.save(req.body);
    res.send(response);
})
bidRouter.get("/bids",async (req,res)=>{
    const response = await bids.load();
    res.send(response);
})
bidRouter.get("/owner/bids/:landlordid",async (req,res)=>{
    const response = await bids.loadByLandlord(req.params.landlordid);
    res.send(response);
})
bidRouter.get("/client/bids/:client",async (req,res)=>{
    const response = await bids.loadByClient(req.params.client);
    res.send(response);
})
bidRouter.get("/bid/:id",async (req,res)=>{
    const response = await bids.load(req.params.id);
    res.send(response);
})
bidRouter.get("/bid/type",async (req,res)=>{
    const response = await bids.loadByType(req.query.type);
    res.send(response);
})
bidRouter.post("/bid/:id",async (req,res)=>{
    const response = await bids.update(req.params.id,req.body);
    res.send(response);
})
bidRouter.post("/bid/status/:id",async (req,res)=>{
    const response = await bids.rejectOrApprove(req.params.id,req.body);
    res.send(response);
})
bidRouter.get("/adminsold/bids",async (req,res)=>{
    const response = await bids.loadSoldOrRent();
    res.send(response);
})
bidRouter.get("/sold/bids",async (req,res)=>{
    const response = await bids.loadSoldOrRent(req.query.landlord,"Landlord");
    res.send(response);
})
bidRouter.get("/bought/bids",async (req,res)=>{
    console.log("Requested")
    const response = await bids.loadSoldOrRent(req.query.client,"Client");
    res.send(response);
})
export default bidRouter;