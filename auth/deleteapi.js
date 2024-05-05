const express = require('express');
const router = express.Router();
const user = require("../model/userSchema")

require('../database/conn');

router.delete("/register/:id" , async(req,res) =>{
    try {
         const id = req.params.id;
         await user.findByIdAndDelete(id );
         res.status(201).send("User Delete Successfully");
     } catch (error) {
         res.status(400).send(error);
     }
 
     }
 )


module.exports = router;