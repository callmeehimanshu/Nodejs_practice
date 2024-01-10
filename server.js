
const express =require("express");
const app=express();

const fs=require("fs")

const users=require('./MOCK_DATA.json')

const port=process.env.PORT || 5000;

// middleware
app.use(express.json());

// http://localhost:5000/users
app.get("/users",(req,res)=>{
    res.send(users)
})

// http://localhost:5000/user/102
app.get("/user/:id",(req,res)=>{
   const user_id=Number(req.params.id);
   const singleuser=users.find((item)=>{
       return item.id===user_id;
   })
   res.send(singleuser)
})

// http://localhost:5000/user/add
app.post("/user/add",(req,res)=>{
    const user_data=req.body;
    console.log(user_data);
    users.push({...user_data,id:users.length+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),()=>{
        return res.send(`user is generated with id ${users.length}`)
    })
   
})

// http://localhost:5000/update/102
app.patch("/update/:id",(req,res)=>{
    const user_id=Number(req.params.id);
    let user_updated=users.find(el=>el.id===user_id)
    let index=users.indexOf(user_updated);
    Object.assign(user_updated,req.body);
    users[index]=user_updated;
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),()=>{
        //  res.send(`user is updated with id ${user_id}`)
         res.status(200).json({
            status:"success",
            data:{
                users:user_updated
            }
        })
    })
   
})

// http://localhost:5000/delete/99
app.delete("/delete/:id",(req,res)=>{
    const user_id=Number(req.params.id);
    let user_deleted=users.find(el=>el.id===user_id)
    let index=users.indexOf(user_deleted);

    users.splice(index,1)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),()=>{
        //  res.send(`user is updated with id ${user_id}`)
         res.status(200).json({
            status:"success",
            data:{
                users:null
            }
        })
    })
   
})

app.listen(port,()=>{
    console.log(`running on port ${port}`);
})