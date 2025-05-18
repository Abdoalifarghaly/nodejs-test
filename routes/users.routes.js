const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const User = require("../models/user");
const joi = require("joi");


const {login ,register,updateuser,deletuser,deletuserbyid,getuser,getuserbyid}=require("../controllers/user.controllers")
///////////////////////////////////
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .send({ message: error.details[0].message, details: error.details });
    }
    next(); // مهم جداً
  };
};
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$"
      )
    )
    .required(),
});
const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$"
      )
    )
    .required(),
  name: joi.string().required(),
  age: joi.number().integer().min(15).required(),
});





router.get("/",getuser );// get all users
router.get("/:id", getuserbyid);// get user by id
router.post("/",validate(registerSchema),register)// register user
router.post("/login",validate(loginSchema),login)// login user
router.delete("/:id",deletuserbyid)// delete user by id
router.delete("/", deletuser)// delete all users
router.patch("/:id", updateuser)// update user by id

module.exports = router;
