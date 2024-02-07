const User = require("../models/user")
const jwt = require('jsonwebtoken');

async function handleUserSignup(req,res){
    try{
        const {name,email,password,text} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            res.json({message:"user already exists"});
        }

        await User.create({
            name,
            email,
            password,
            text
        })
        res.json({message:"user created successfully"})
    }
    catch(err){console.log(err)}
}
async function handleUserLogin(req,res){
    try{
        const {email,password} = req.body;
        console.log(req.body);
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).send('Invalid Email or Password')
        }

        req.user = user;

        const token = jwt.sign(
            {email:user.email},
            'secret',
        );
        
        res.cookie("token",token)
        .json({message:`${user.name} login successfull`})
        
    }
    catch(err){
        console.log(err.message);
        res.send(err.message)
    }
}
// async function checkForLogin(req,res){
//     const token = req.cookies.token;

//     if(!token){
//         return res.json({message: "not signed in"});
//     }

//     try{
//         const verifiedToken = jwt.verify(token, 'secret');
        
//         const email = verifiedToken.email;
        
//         const user = await User.findOne({email});
        
//         if(!user){
//             return res.json({message:"user is not present in database"})
//         }
            
//         req.user = user;
//         res.json({message:`hello ${req.user.name} this is your text: ${req.user.text}`})
            
//     }
//     catch(err){
//         console.log(err);
//         res.send(err.message);
//     }
// }
/*  better to use a middleware instead of constroller for verifying jwt credentials
    because middleware allows you to perform further actions 
*/

module.exports = {
    handleUserLogin,
    handleUserSignup,
    // checkForLogin
}