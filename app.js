const express=require('express')
const app=express()
const router=require('./routes/routes')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
require('dotenv').config()

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json())
app.use(router);
const Connection =()=>{ mongoose.connect(process.env.MD_CONN)
    .then((res)=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log(err)
    });}

app.listen(4000,()=>{
    Connection()
    console.log("Server Listen on Port 4000")
})