const express = require('express')
const router = express.Router();

const fetchuser = require('../middleware/fetchUser')
const User = require('../db/schema/user')
const DashboardUser = require('../db/schema/dashboardUser')

// this route is for user data from the database, given the auth token 
router.get('/getUserData',fetchuser, async (req,res)=>{
    try{
        const data = await User.findOne({_id:req.userID}).select('-pass');
        res.status(200).send(data);
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({'error':'Internal server error'});
    }
})

// this route is for getting all the questions | given langauge 
router.post('/adduser', fetchuser ,async (req,res)=>{
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

router.get('/dashuser',fetchuser,async (req, res)=>{
    try{
        let user = await DashboardUser.find({parentUserId:req.userID})
        res.status(200).send({user})
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})
router.put('/update',fetchuser,async (req, res)=>{
    try{
        const userId = req.header('userid');
        let user = await DashboardUser.findByIdAndUpdate(userId,req.body)
        res.status(200).send({user})
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})
router.delete('/delete',fetchuser,async (req, res)=>{
    try{
        const userId = req.header('userid');
        let user = await DashboardUser.findByIdAndDelete(userId)
        res.status(200).send({user})
    }catch(e){
        console.log("Error : ",e.message);
        res.status(500).send({"error":'Internal server error'});
    }
})


module.exports = router;