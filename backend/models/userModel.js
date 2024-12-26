const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["student", "recruiter"],
        required : true
    },
    profile : {
        bio : {type : String},
        resume : {type : String},
        skills : [{type : String}],
        resumeOriginalName : {type : String}, // to store the original name of the file
        company : {type : mongoose.Schema.Types.ObjectId, ref : "company"},
        profilePhoto : {
            type : String,
            default : "",
        }
    }
},{timestamps : true})

const User = mongoose.model("user", userSchema);
module.exports = User;