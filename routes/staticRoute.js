const express = require('express');
const { checkForLogin } = require('../controllers/userController');
const router = express.Router();

// router.get('/',checkForLogin);
router.get('/',(req,res)=>{
    if(!req.user){
        return res.send("not logged in");
    }
    res.send(`hello ${req.user.name} you are logged in`);
    
});


module.exports = router;