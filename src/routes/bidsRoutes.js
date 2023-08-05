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
export default bidRouter;