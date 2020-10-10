const express = require('express')
const router = new express.Router()
const UserController=require('../controller/user')

router.get('/users',UserController.getAllUsers)

module.exports=router