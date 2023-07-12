import express from "express";
import sales from "../controllers/sales";
const saleRouter = express.Router();

saleRouter.post("/sale",async (req,res)=>{
    const response = await sales.save(req.body);
    res.send(response);
})
saleRouter.get("/sales",async (req,res)=>{
    const response = await sales.load();
    res.send(response);
})
saleRouter.get("/sale/:id",async (req,res)=>{
    const response = await sales.load(req.params.id);
    res.send(response);
})
saleRouter.get("/sale/type",async (req,res)=>{
    const response = await sales.loadByType(req.query.type);
    res.send(response);
})
saleRouter.post("/sale/:id",async (req,res)=>{
    const response = await sales.update(req.params.id,req.body);
    res.send(response);
})
export default saleRouter;