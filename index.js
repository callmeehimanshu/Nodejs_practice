const express =require("express");
const app=express();

const bodyparser=require("body-parser");
app.use(bodyparser.json())

const port=process.env.PORT || 3000;
app.get("/first",(req,res)=>{
    res.json({
        name:"himanshu",
        age:"21"
    })
})
app.post("/post",(req,res)=>{
    console.log(req.body);
    res.send("its a post request")
})
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(port,()=>{
    console.log(`on port ${port}`);
})
