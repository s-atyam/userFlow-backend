// Import necessary modules
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('../src/db/schema/user')
const DashboardUser = require('../src/db/schema/dashboardUser')

const fetchuser = require('../src/middleware/fetchUser')

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const mongoURL = process.env.MONGO_URI

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// for connecting to database
await mongoose.connect(mongoURL,{dbName:'UserFlow'});

app.post('/api/signup',async (req,res)=>{
    try{
        const data = await User.findOne({email:req.body.email});
        if(data){
            res.status(401).send({error:'Email already in use'});
            return;
        }else{
            const passHash = await bcrypt.hash(req.body.pass,await bcrypt.genSalt(10))
            req.body.pass = passHash;
            
            const newUser = new User(req.body);
            await newUser.save()

            const existUser = await User.findOne({email:req.body.email})

            const authToken = jwt.sign({ID:existUser._id},JWT_SECRET);
            res.status(200).send({authToken});
        }
    }catch(e){
        console.log("Error : ",e)
    }
})

app.post('/api/login', async (req,res)=>{
    try{
        const existUser = await User.findOne({email:req.body.email});
        if(!existUser){
            res.status(401).send({error:'Wrong credencials'})
            return;
        }
        const passwordCompare = await bcrypt.compare(req.body.pass,existUser.pass);
        if(!passwordCompare){
          res.status(401).send({error:'Wrong credencials'});
          return;
        }
        const authToken = jwt.sign({ID:existUser._id},JWT_SECRET);
        res.status(200).send({authToken});
    }catch(e){
        console.log("Error : ",e.message);
    }
})

app.post('/api/adduser', fetchuser ,async (req,res)=>{
    try{
        req.body.parentUserId = req.userID
        const newUser = new DashboardUser(req.body)
        await newUser.save()
        res.status(200).send({'success':"New user created"})

    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})

app.get('/api/dashuser',fetchuser,async (req, res)=>{
    try{
        let user = await DashboardUser.find({parentUserId:req.userID})
        res.status(200).send({user})
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})
app.put('/api/update',fetchuser,async (req, res)=>{
    try{
        const userId = req.header('userid');
        let user = await DashboardUser.findByIdAndUpdate(userId,req.body)
        res.status(200).send({user})
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})
app.delete('/api/delete',fetchuser,async (req, res)=>{
    try{
        const userId = req.header('userid');
        let user = await DashboardUser.findByIdAndDelete(userId)
        res.status(200).send({user})
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})

module.exports = app;