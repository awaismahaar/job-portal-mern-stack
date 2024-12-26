const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    job : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'job',
        required : true
    },
    applicant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'accepted', 'rejected'],
        default : 'pending'
    }
},{timestamps : true})

const Application = mongoose.model('application', applicationSchema);

module.exports = Application;