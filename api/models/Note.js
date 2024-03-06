const mongoose=require('mongoose')
const {model,Schema}=mongoose

const noteSchema= new Schema({
    content:String,
    date:Date,
    important:Boolean,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

noteSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Note=model('Note', noteSchema)
module.exports=Note

/* Note.find({}).then(result=>{
    console.log(result)
    mongoose.connection.close()
}) */

/* const note=new Note({
    content:'Mongo DB es tremendo, pa',
    date:new Date(),
    impotant:true
})

note.save()
    .then(result=>{
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err=>{
        console.log("ERROR")
        console.error(err)
    }) */