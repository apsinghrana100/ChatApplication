const express=require('express');
const router=express.Router();
const groupchat=require('../controller/groupchat')
const authentication=require('../middleware/auth');

router.post('/createGroup',groupchat.CreateGroup);
router.get('/FetchGroupName',authentication.authentication,groupchat.FetchGroupName)
router.post('/addGroupMessage',authentication.authentication,groupchat.AddGroupchatMessage);
router.get('/fetchGroupChat',authentication.authentication, groupchat.fetchGroupMessage);
module.exports=router;
