import express from "express";
import path from "path";
import users from "../controllers/users";
import cookieSession from "cookie-session";
const viewRouter = express.Router();
let views_path = path.join(__dirname,"../views")
let views_system_path = path.join(views_path,"/mis")

const readCookieRenderSidebar = (req)=>{
    console.log(req.header("Cookie"));
    const cookieArr = req.header("Cookie").split(";");
    let cookieValue = "",sidebar="";
    for(let i=0;i<cookieArr.length;i++){
        let cookieSplit = cookieArr[0].split("=");
        if(cookieSplit[0]==="user_type"){
            cookieValue = cookieSplit[1];
            break;
        }
    }
    switch (cookieValue.toLowerCase()){
        case "admin":
            sidebar = "includes/admin-sidebar.html";break;
        case "landlord":
            sidebar = "includes/landlord-sidebar.html";break;
        case "client":
            sidebar = "includes/client-sidebar.html";break;
        default:
            sidebar = "includes/client-sidebar.html";break;
    }
    return sidebar;
}

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
    res.render(`${views_system_path}/add-property.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/properties",async (req,res)=>{
    res.render(`${views_system_path}/in-properties.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/update-property/:id",async (req,res)=>{
    res.render(`${views_system_path}/update-property.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/user/add",async (req,res)=>{
    res.render(`${views_system_path}/add-user.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/users",async (req,res)=>{
    res.render(`${views_system_path}/in-users.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/user/:id",async (req,res)=>{
    res.render(`${views_system_path}/update-user.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/bids",async (req,res)=>{
    res.render(`${views_system_path}/in-bids.html`,{layout:readCookieRenderSidebar(req)});
})

viewRouter.get("/v/sales",async (req,res)=>{
    res.render(`${views_system_path}/in-sales.html`,{layout:readCookieRenderSidebar(req)});
})
viewRouter.get("/v/reviews",async (req,res)=>{
    res.render(`${views_system_path}/reviews.html`);
})

viewRouter.get("/v/profile",async (req,res)=>{
    res.render(`${views_system_path}/users-profile.html`,{layout:readCookieRenderSidebar(req)});
})

viewRouter.get("/v/report",async (req,res)=>{
    res.render(`${views_system_path}/reports.html`,{layout:readCookieRenderSidebar(req)});
})



export default viewRouter;