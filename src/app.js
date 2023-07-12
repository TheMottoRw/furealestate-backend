import express, { json } from 'express';
import userRouter from "./routes/usersRoutes";
import propertyRouter from "./routes/propertiesRoutes";
import saleRouter from "./routes/salesRoutes";
import bidRouter from "./routes/bidsRoutes";

const app = express();
app.use(json())
app.use(userRouter)
app.use(propertyRouter)
app.use(saleRouter)
app.use(bidRouter)
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

