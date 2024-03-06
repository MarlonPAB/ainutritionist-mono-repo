const mongoose=require('mongoose')
const {model,Schema}=mongoose
const uniqueValidator=require('mongoose-unique-validator')
const userSchema=new Schema({
    username:String,
    email:{
        type:String,
        unique:true
    },
    passwordHash:String,
    notes:[{
        type:Schema.Types.ObjectId,
        ref:'Note'
    }],
    bannedIngredients:[String],
    bannedDishes:[String]
})
userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

const User=model('User',userSchema)
module.exports=User