const express=require('express');
const router=express.Router();
const signinController=require('../controller/SigninC')
const userDetail=require('../controller/userchat')

router.post('/adduserdetail',signinController.addUserDetail);
router.post('/login',signinController.loginUser);
router.get('/UserDetail',userDetail.UserDetail);

module.exports=router;
