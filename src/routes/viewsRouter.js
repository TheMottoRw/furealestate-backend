import express from "express";
import path from "path";
import users from "../controllers/users";
const viewRouter = express.Router();


let views_path = path.join(__dirname,"../views")
let views_system_path = path.join(views_path,"/mis")
viewRouter.get("/v/",async (req,res)=>{
    res.render(`${views_path}/index.html`);
})
viewRouter.get("/v/property",async (req,res)=>{
    res.render(`${views_path}/property-grid.html`);
})
viewRouter.get("/v/property/:id",async (req,res)=>{
    res.render(`${views_path}/property-single.html`);
})
viewRouter.get("/v/about",async (req,res)=>{
    res.render(`${views_path}/about.html`);
})
viewRouter.get("/v/login",async (req,res)=>{
    res.sendFile(`${views_path}/pages-login.html`);
})
viewRouter.get("/v/register",async (req,res)=>{
    res.sendFile(`${views_path}/page-register.html`);
})
viewRouter.get("/v/contact",async (req,res)=>{
    res.render(`${views_path}/contact.html`);
})
viewRouter.get("/v/add-property",async (req,res)=>{
    res.render(`${views_system_path}/add-property.html`);
})
viewRouter.get("/v/properties",async (req,res)=>{
    res.render(`${views_system_path}/in-properties.html`);
})
viewRouter.get("/v/update-property/:id",async (req,res)=>{
    res.render(`${views_system_path}/update-property.html`);
})
viewRouter.get("/v/user/add",async (req,res)=>{
    res.render(`${views_system_path}/add-user.html`);
})
viewRouter.get("/v/users",async (req,res)=>{
    res.render(`${views_system_path}/in-users.html`);
})
viewRouter.get("/v/user/:id",async (req,res)=>{
    res.render(`${views_system_path}/update-user.html`);
})
viewRouter.get("/v/bids",async (req,res)=>{
    res.render(`${views_system_path}/in-bids.html`);
})

viewRouter.get("/v/sales",async (req,res)=>{
    res.render(`${views_system_path}/in-sales.html`);
})

viewRouter.get("/v/profile",async (req,res)=>{
    res.sendFile(`${views_system_path}/users-profile.html`);
})



export default viewRouter;