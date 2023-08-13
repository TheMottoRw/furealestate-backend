import express, { json } from 'express';
import userRouter from "./routes/usersRoutes";
import propertyRouter from "./routes/propertiesRoutes";
import saleRouter from "./routes/salesRoutes";
import bidRouter from "./routes/bidsRoutes";
import viewRouter from "./routes/viewsRouter";

import path from "path"
import nunjucks from "nunjucks";
import expressNunjucks from 'express-nunjucks';
import reviewRouter from "./routes/reviewsRoutes";
import cookieSession from "cookie-session";
const app = express();
const views = __dirname+'/views';
app.set("views",views);
const njk = expressNunjucks(app, {
    watch: true,
    noCache: true,
    autoescape:true
});
app.use(json())
app.use(userRouter)
app.use(propertyRouter)
app.use(saleRouter)
app.use(bidRouter)
app.use(reviewRouter)
app.use(viewRouter)

//Cookies
app.use(cookieSession({
    name: 'session',
    keys: ["furealestate"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
const PORT = process.env.PORT || 3000;
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    res.redirect('/v/')
});
app.get("/view",async (req,res)=>{
    console.log(path.join(__dirname))
    // res.json({field:"File render"})
    res.sendFile(path.join(__dirname, '/views/index.html'));

})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

