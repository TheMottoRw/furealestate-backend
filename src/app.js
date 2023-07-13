import express, { json } from 'express';
import userRouter from "./routes/usersRoutes";
import propertyRouter from "./routes/propertiesRoutes";
import saleRouter from "./routes/salesRoutes";
import bidRouter from "./routes/bidsRoutes";
import viewRouter from "./routes/viewsRouter";

import path from "path"

const app = express();
app.use(json())
app.use(userRouter)
app.use(propertyRouter)
app.use(saleRouter)
app.use(bidRouter)
app.use(viewRouter)
const PORT = process.env.PORT || 3000;
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});
app.get("/view",async (req,res)=>{
    console.log(path.join(__dirname))
    // res.json({field:"File render"})
    res.sendFile(path.join(__dirname, '/views/index.html'));

})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

