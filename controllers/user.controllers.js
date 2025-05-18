const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const User = require("../models/user");
require("dotenv").config()


//login
const login= async (req, res) => {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(400).send({ message: "email and password are required" });
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).send({ message: "user not found" });
      }
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "invalid password" });
      }
   const topSecret=process.env.SECRET
   const token=jwt.sign({id:user._id},topSecret,{expiresIn:"1h"})
      res.status(200).send({token, message: "login successfully" });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).send("Server error");
    }}

    //great user

const register= async (req, res) => {
      try {
       
        const { email, password, name, age } = req.body;
        
    
        // Check required fields
        if (!email || !password || !name || !age) {
          return res.status(400).send({ message: "All fields are required" });
        }
     
    
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).send({ message: "User already exists" });
        }
    
        // Save new user
        const newUser = await User.create({ email, password, name, age });
        if (!newUser) {
          return res.status(400).send({ message: "Failed to create user" });
        }
        res.status(201).send(newUser);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Server error");
      }}
// // Update user by id
const updateuser=async (req, res) => {
    const { id } = req.params;
    const { email, password, name, age } = req.body;
    if (password) {
      try {
        const salt = await bycrypt.genSalt(10);
        hasedpassword = await bycrypt.hash(password, salt);
        req.body.password = hasedpassword;
      } catch (error) {
        return res.status(500).send({ message: "Error encrypting password" });
      }
    }
    try {
      const users = await User.findOneAndUpdate(
        { id: Number(id) },
        { email, password, name, age },
        { new: true }
      );
      if (!users) {
        return res.status(400).send({ message: "user not found" });
      }
      res.status(200).send({ message: "User Updata sucsesfully", users });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Server error");
    }}
    // // Delete all users
const deletuser=async (req, res) => {
        try {
          const users = await User.deleteMany();
          res.status(200).send({ message: "all users deleted successfully", users });
        } catch (error) {
          console.error("Error deleting all users:", error);
          res.status(500).send("Server error");
    }}
// // Delete user by id
const deletuserbyid= async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOneAndDelete({ id: Number(id) });
      if (!user) {
        return res.status(400).send({ message: "user not found" });
      }
      res.status(200).send({ message: "user deleted successfully", user });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Server error");
    }}
    // Get all users
const getuser = async (req, res) => {
      try {
        const users = await User.find();
        if (!users || users.length === 0) {
          return res.status(400).send({ message: "No users found" });
        }
        res.status(200).send(users);
      } catch (error) {
        console.error("Error reading users:", error);
        res.status(500).send("Server error");
      }
    };
    // Get user by id
const getuserbyid = async (req, res) => {
      const { id } = req.params;

      try {
        const user = await User.findOne({ id: Number(id) });
        if (!user) {
          return res.status(400).send({ message: "user not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Server error");
      }
    };
module.exports = {
  register,
  login,
    updateuser,
    deletuser,
    deletuserbyid,
    getuser,
    getuserbyid

};