const express = require('express');
const router = express.Router();
const user = require("../model/userSchema")

require('../database/conn');


router.post("/addstudent", async (req, res) => {
    try {
        const User = new user(req.body);
        const adduser = await User.save();
        if(adduser){
            res.status(201).send({adduser , success:true});
        }else{
            res.status(404).send({adduser , success:flase});
        }
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router;
