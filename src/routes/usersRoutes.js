import express from "express";
import users from "../controllers/users";
const userRouter = express.Router();

userRouter.post("/user",async (req,res)=>{
    const response = await users.save(req.body);
    res.send(response);
})
userRouter.post("/login",async (req,res)=>{
    const response = await users.login(req.body);
    if(response.status){
        res.cookie("user_type",response.data[0].user_type);
    }
    res.send(response);
})
userRouter.get("/users",async (req,res)=>{
    const response = await users.load();
    res.send(response);
})
userRouter.get("/user/:id",async (req,res)=>{
    const response = await users.load(req.params.id);
    res.send(response);
})
userRouter.get("/user/type",async (req,res)=>{
    const response = await users.loadByType(req.query.type);
    res.send(response);
})
userRouter.post("/user/:id",async (req,res)=>{
    console.log(req.params.id)
    const response = await users.update(req.params.id,req.body);
    res.send(response);
})
export default userRouter;