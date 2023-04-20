const express=require('express');
const router=express.Router();
const userchatC=require('../controller/userchat')
const authentication=require('../middleware/auth');

 router.post('/addchat',authentication.authentication,userchatC.Adduserchat);
 router.get('/fetchchat', userchatC.fetchChat);

 module.exports=router;
