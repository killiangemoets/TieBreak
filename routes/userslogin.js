var express = require("express");
var router = express.Router();
var userModel = require("../models/users");
const mongoose = require("mongoose");


router.post('/sign-up', async function(req, res, next) {
    var userList = await userModel.findOne({email: req.body.email})
    if(!userList) {
        var newUser = new userModel({

        })
    }


})