const mongoose=require("mongoose")
const bycrypt=require("bcrypt")
const AutoIncrement = require("mongoose-sequence")(mongoose);

const {Schema}=mongoose;
const userSchema=new Schema({
    name:{
        type:'string',
        required:true,
        trim:true
    },email:{
        type:'string',
        required:true,
        unique:true
    },password:{
        type:'string',
        required:true,
     
        select:false
    },age:{
        type:'number',
        required:true
    },id:{
        type:Number
    }

    
    
})
userSchema.plugin(AutoIncrement, { inc_field: "id" });
//bycrypt is used to compare the password entered by the user with the hashed password stored in the database
userSchema.pre("findOneAndUpdate",async function(next){
    const update=this.getUpdate()
    if(update.password){
      try {
          const salt = await bycrypt.genSalt(10);
          update.password = await bycrypt.hash(update.password, salt);
          this.setUpdate(update);
      } catch (error) {
        return next(error);
      }
    }
   next()
})
//bycrypt is used to hash the password before saving it to the database
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    try {
        const salt=await bycrypt.genSalt(10)
        this.password=await bycrypt.hash(this.password,salt)
        next()
    } catch (error) {
        return next(error)
    }
})
const user=mongoose.model("User",userSchema)
module.exports=user
