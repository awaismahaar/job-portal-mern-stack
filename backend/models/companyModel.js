const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name : {
        type : 'string',
        required : true
    },
    description : {
        type : 'string',  
    },
    location : {
        type : 'string',
    },
    website : {
        type : 'string',
    },
    logo : {
        type : 'string',
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
},{timestamps : true});

const Company = mongoose.model('company',companySchema);
module.exports = Company;