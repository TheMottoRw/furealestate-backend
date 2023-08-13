import express from "express";
import path from "path";
import users from "../controllers/users";
import cookieSession from "cookie-session";
const viewRouter = express.Router();
import utils, {readCookieRenderSidebar} from "../public/assets/js/utils";

let views_path = path.join(__dirname,"../views")
let views_system_path = path.join(views_path,"/mis")
viewRouter.get("/",async (req,res)=>{
    res.redirect(`/v/`);
})
viewRouter.get("/v/",async (req,res)=>{
    res.render(`${views_path}/index.html`);
})
viewRouter.get("/v/property",async (req,res)=>{
    console.log(`Cookie: ${req.signedCookies}`)
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
    res.render(`${views_system_path}/add-property.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/properties",async (req,res)=>{
    res.render(`${views_system_path}/in-properties.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/update-property/:id",async (req,res)=>{
    res.render(`${views_system_path}/update-property.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/user/add",async (req,res)=>{
    res.render(`${views_system_path}/add-user.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/users",async (req,res)=>{
    res.render(`${views_system_path}/in-users.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/user/:id",async (req,res)=>{
    res.render(`${views_system_path}/update-user.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/bids",async (req,res)=>{
    res.render(`${views_system_path}/in-bids.html`,{layout:utils.readCookieRenderSidebar(req)});
})

viewRouter.get("/v/sales",async (req,res)=>{
    res.render(`${views_system_path}/in-sales.html`,{layout:utils.readCookieRenderSidebar(req)});
})
viewRouter.get("/v/reviews",async (req,res)=>{
    res.render(`${views_system_path}/reviews.html`);
})

viewRouter.get("/v/profile",async (req,res)=>{
    res.render(`${views_system_path}/users-profile.html`,{layout:utils.readCookieRenderSidebar(req)});
})



export default viewRouter;