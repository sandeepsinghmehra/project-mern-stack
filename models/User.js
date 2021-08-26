const {model, Schema}  = require('mongoose');
const userSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
    blockStatus: {
        type: String,
        enum: ['false', 'true'],
        default: 'false',
    }
}, {
    timestamps: true
});


module.exports = model("user", userSchema);