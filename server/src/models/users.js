const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    discordID : {
        type : String,
        required : true
    },
    discordPP : {
        type : String,
        required : true
    },
    isOnServer : {
        type : Boolean,
        required : true,
        default : false
    },
    position : {
        type : String,
        required : false,
    },
    lastToken : {
        type : String,
        require : true,
    }
})

module.exports = mongoose.model('Users', usersSchema);