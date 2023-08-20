import express, {json} from 'express';
import userRouter from "./routes/usersRoutes";
import propertyRouter from "./routes/propertiesRoutes";
import saleRouter from "./routes/salesRoutes";
import bidRouter from "./routes/bidsRoutes";
import viewRouter from "./routes/viewsRouter";

import path from "path"
import nunjucks from "nunjucks";
import expressNunjucks from 'express-nunjucks';
import reviewRouter from "./routes/reviewsRoutes";
import contactRouter from "./routes/contactRoutes";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const views = __dirname + '/views';
app.set("views", views);
const njk = expressNunjucks(app, {
    watch: true,
    noCache: true,
    autoescape: true
});
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(userRouter)
app.use(propertyRouter)
app.use(saleRouter)
app.use(bidRouter)
app.use(reviewRouter)
app.use(contactRouter)
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
app.use("/images", express.static("src/uploads"))

app.get('/', async (req, res) => {
    res.redirect('/v/')
});
app.get("/view", async (req, res) => {
    console.log(path.join(__dirname))
    // res.json({field:"File render"})
    res.sendFile(path.join(__dirname, '/views/index.html'));

})
const upload = multer({dest: 'src/uploads/'});
const uploadResponse = upload.array("photos");

app.post("/upload", async (req, res) => {
    let photos = [];
    uploadResponse(req, res, function (err) {
        if (err) {
            // console.log(err);
            res.json({status: false, message: "Something went wrong,file not uploaded"})
        }
        if (!err) {
            // it's all fine,do whatever
            console.log(`File uploaded successfully`)
            res.json({field: "File render", photos: req.files})
        }
    })
    // res.sendFile(path.join(__dirname, '/views/index.html'));
})


app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

