const express=require('express');
const router=express.Router();
const signinController=require('../controller/SigninC')

router.post('/adduserdetail',signinController.addUserDetail);
router.post('/login',signinController.loginUser);

module.exports=router;
