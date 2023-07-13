import express from "express";
import path from "path";
import users from "../controllers/users";
const viewRouter = express.Router();


let views_path = path.join(__dirname,"../views")

viewRouter.get("/v/",async (req,res)=>{
    res.sendFile(`${views_path}/index.html`);
})
viewRouter.get("/v/property",async (req,res)=>{
    res.sendFile(`${views_path}/property-grid.html`);
})
viewRouter.get("/v/property/:id",async (req,res)=>{
    res.sendFile(`${views_path}/property-single.html`);
})
viewRouter.get("/v/about",async (req,res)=>{
    res.sendFile(`${views_path}/about.html`);
})
viewRouter.get("/v/login",async (req,res)=>{
    res.sendFile(`${views_path}/login.html`);
})
viewRouter.get("/v/contact",async (req,res)=>{
    res.sendFile(`${views_path}/contact.html`);
})

export default viewRouter;