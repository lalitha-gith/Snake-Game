const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asycHandler = require('express-async-handler')

const router = express.Router();


router.patch("/updateUserscore",asycHandler(async(req,res)=>{
    const {username,score} = req.body
    const user = await User.findOne({username})
    if(!user){
      return res.status(400).json({success:false,message:"User Not available"})
    }else if(score>user.score){
      const updateuser = await User.findByIdAndUpdate(user._id,{username:username,score:score})
      if(updateuser){
        return res.status(200).json({success:true,message:"User score Updated"})
      }
      else{
        return res.status(500).json({success:false,message:"Internal server error"})
      }
    }
}))


router.get("/highestScores",asycHandler(async(req,res)=>{
    try{
    const highScore = await User.aggregate([
        {
          $sort: { score: -1 }
        },
        {
          $limit: 3
        }
      ])
    
    if(highScore){
        return res.status(200).json({success:true,message:"User fetched succesfully",data:highScore})
    }else{
        return res.status(500).json({success:false,message:"Users failed to fetch"})
    }
    }
    catch{
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}))
  

module.exports = router