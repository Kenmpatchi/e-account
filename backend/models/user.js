const mongoose=require('mongoose');
const User = mongoose.model( 'User' , {
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    pass:{
        type:String
    }
})
module.exports=User

