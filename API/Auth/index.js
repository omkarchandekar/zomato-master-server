// Libraries
import { returnStatement } from "@babel/types";

import express from "express";
import bcryptjs from "bcryptjs";
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";
// let jwt = require('jsonwebtoken');


//Models
import {UserModel} from "../../database/user"
import passport from "passport";

// Validation
import {ValidateSignin, ValidateSignup} from '../../validation/auth';

//Create a router
const Router = express.Router();

/**
 * Router       /signup
 * Des          Register new user
 *  Params      none
 * Access       Public
 * Method       POST 
 */
 Router.post("/signup", async (req, res) => {
    try {
      await ValidateSignup(req.body.credentials);
      await UserModel.findByEmailAndPhone(req.body.credentials);
      const newUser = await UserModel.create(req.body.credentials);
      const token = newUser.generateJwtToken();
      return res.status(200).json({ token, status: "success" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/**
 * Router       /signin
 * Des          Sign-in with email and password
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /google
 * Des          Google Sign-in
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get("/google", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}));

/**
 * Router       /google/callback
 * Des          Google Sign-up
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}),
 (req,res) => {
  return res.redirect(`http://localhost:3000/google/${req.session.passport.user.token}`);
}
);


// Dummy code for previous understanding
// Router.post("/signup", async (req,res) => {
//     try{
//         const {email, password, fullName, phoneNumber} = req.body.credentials;
//         const checkUserByEmail = await UserModel.findOne({email});
//         const checkUserByPhone = await UserModel.findOne({phoneNumber});

//         if(checkUserByEmail || checkUserByPhone){
//             return res.json({ user : "User already exists!"});
//         }

//         // hasing password (package used - bcryptjs)
//         // salting password - loop of hashing
//         const bcryptSalt = await bcrypt.genSalt(8);                     //loop for hash 8 times
//         const hashedPassword = await bcrypt.hash(password, bcryptSalt); //hash the password for a given no. of salts

//         //saving data to database
//         await UserModel.create({
//             ...req.body.credentials, 
//             password: hashedPassword
//         });

//         //tokenisation (generate JWT auth token  JWT=json web tokens) (package used - json web token)
//         const token = jwt.sign({user: {fullName, email}}, "ZomatoApp");
//         return res.status(200).json({token, status: "Success"});

//     }catch(error){
//         return res.status(500).json({error: error.message});
//     }

// });


export default Router;

// export default "Auth";