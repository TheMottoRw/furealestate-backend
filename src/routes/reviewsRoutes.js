import express from "express";
import reviews from "../controllers/reviews";
const reviewRouter = express.Router();

reviewRouter.post("/review",async (req,res)=>{
    const response = await reviews.save(req.body);
    res.send(response);
})
reviewRouter.get("/reviews",async (req,res)=>{
    const response = await reviews.load();
    res.send(response);
})
reviewRouter.get("/review/:id",async (req,res)=>{
    const response = await reviews.load(req.params.id);
    res.send(response);
})
reviewRouter.get("/review/property/:propertyId",async (req,res)=>{
    const response = await reviews.loadByProperty(req.params.propertyId);
    res.send(response);
})
reviewRouter.post("/review/:id",async (req,res)=>{
    console.log(req.params.id)
    const response = await reviews.update(req.params.id,req.body);
    res.send(response);
})
export default reviewRouter;