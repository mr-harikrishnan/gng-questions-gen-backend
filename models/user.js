const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
    },
    mobile_no:{
        type:Number
    }
})

const User=mongoose.model("user",UserSchema)

module.exports={User}