const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{type: String}],
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type : String,
        required : true
    },
    jobType : {
        type : String,
        required : true
    },
    position : {
        type : String,
        required : true 
    },
    companyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'company',
        required : true
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    applications : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'application',
    }],
},{timestamps : true});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;