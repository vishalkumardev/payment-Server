const express = require('express');
const router = express.Router();
const user = require("../model/userSchema")

require('../database/conn');


router.get("/getstudent" , async(req,res) => {
    const registration = await user.find({});
    res.status(200).send(registration);
})

router.get("/getstudent/:id" , async(req,res) => {
    const _id = req.params.id
    const registration = await user.findById({_id});
    res.status(200).send(registration);
})

module.exports = router;