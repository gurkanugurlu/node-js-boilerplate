const express = require('express')
const router = new express.Router()
const LoginController=require('../controller/login')

router.post('/login',LoginController.login)

module.exports=router