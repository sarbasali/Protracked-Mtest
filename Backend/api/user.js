const express = require('express');
const router = express.Router();

//mongo user model
const User = require('./../model/model')
//password handler
const bcrypt = require("bcrypt");


// Signup
router.post('/signup', async (req ,res)=>{

    let { name, email, password } = req.body;
    email=email.trim();
    password=password.trim();

    if(name === ""|| email === ""|| password === ""){
       return res.json({
            status:"FAILED",
            message:"Empty input feilds"
        });
    }else if(!/^[a-zA-Z]*$/.test(name)){
       return res.json({
            status:"FAILED",
            message:"Empty input feilds"
        });

    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
       return res.json({
            status:"FAILED",
            message:"Invalid email entered"
        });
    }
    // else if(!new Date(DOB).getTime()){
    //    return res.json({
    //         status:"FAILED",
    //         message:"Invalid date of birth"
    //     })
    // }
    else if (password.legth<8){
        res.json({
            status:"FAILED",
            message:"password is too short"
        });
    }else{
        //checkong user already exists
        User.find({email}).then((result) => {
            if (result.legth) {
                //A user already exists 
                res.json({
                    status:"FAILED",
                    message:"User with the priovided email already exists"
                })
            }else{
                //try to careate new user
                //password handling
                const saltRounds=10
                bcrypt.hash(password,saltRounds).then(hashpassword =>{
                    const newUser=new User({
                        name,
                        email,
                        password:hashpassword,
                       
                    })
                    newUser.save().then(result=>{
                        res.json({
                            status:"SUCCES",
                            message:"signup successful",
                            data:result,
                        })
                    })
                    .catch(err=>{
                        res.json({
                            status:"FAILED",
                            message:"an error occured while saving  user account"
                        })

                    })

                }).catch(err =>{
                    res.json({
                        status:"FAILED",
                        message:"an error occured while hashing password"
                    })
                })

            }
            
        }).catch((err) => {
            console.log(err);
            req.json({
                status:"FAILED",
                message:"An error occurred while checking for existing user"
            })
        });
    }

})

router.post('/singin', (req ,res)=>{
    let {  email, password } = req.body;

    email=email.trim();
    password=password.trim();

    if (email == ""|| password =="") {
        res.json({
            status:"FAILED",
            message:"Empty credenteials "

        })
    }else{
        //check if user exist
        User.find({email}).then(data =>{
            if(data.length){
                //user exist
                const hashedPassword=data[0].password;
                bcrypt.compare(password,hashedPassword).then(result=>{

                    if (result) {
                        //password match 
                        res.json({
                            status:"success",
                            message:"  Signin succesful   ",
                            data:data
        
                        })
                    }else{
                        res.json({
                            status:"FAILED",
                            message:"  Invalid password entered   "
                        })
        
                    }
                })
                .catch(err=>{
                    res.json({
                        status:"FAILED",
                        message:"  An error ocurred while comparing password "
                    })
                })
            }else{
                res.json({
                    status:"FAILED",
                    message:" Invalid credntials entered"
                })
            }
          
        })
        .catch(err=>{
            res.json({
                status:"FAILED",
                message:" An error occurred while checking for existing user"
            })
        })

    }

})

module.exports=router;











