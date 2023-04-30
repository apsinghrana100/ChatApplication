const express=require('express');
const router=express.Router();
const signinController=require('../controller/SigninC')
const authentication=require('../middleware/auth');
const userDetail=require('../controller/userchat')

router.post('/adduserdetail',signinController.addUserDetail);
router.post('/login',signinController.loginUser);
router.get('/UserDetail',authentication.authentication,userDetail.UserDetail);
router.get('/AddNewUser',authentication.authentication,signinController.AddNerUser)

module.exports=router;
