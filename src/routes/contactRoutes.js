import express from "express";
import contact from "../controllers/contact";


const contactRouter = express.Router();

contactRouter.post("/contactus",async (req,res)=>{
    const response = await contact.send(req.body);
    res.send(response);
})

export default contactRouter