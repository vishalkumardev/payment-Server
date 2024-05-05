const express = require('express');
const router = express.Router();
const user = require("../model/userSchema")

require('../database/conn');


router.patch("/updatefees/:id" , async(req,res) =>{
    var amount = req.body.amount/100;
   
   try {
         const id = req.params.id;
         const update = await user.findByIdAndUpdate(id,  { $inc: { fees: - amount } } ,{
             new:true,
         });
         res.status(201).send(update);
     } catch (error) {
         res.status(400).send(error);
     }
 
     }
 )

 module.exports = router;