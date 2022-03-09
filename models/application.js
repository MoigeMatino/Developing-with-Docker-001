const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const ApplicationSchema = new mongoose.Schema({
    fullname: {
        type:String
    },
    email:{
        type:String,
        validate: [validateEmail, 'Please enter a valid email']
    },
    message: {
        type: String,
        maxlength: 300
    },
    resume:{
        type: {
            type:String
        }
    }
    // { typeKey: '$type' },
})

module.exports = mongoose.model('Applications', ApplicationSchema)