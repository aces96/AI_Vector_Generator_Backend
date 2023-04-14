const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        default: ""
    },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],
    account_id:{
        type: String
    },
    tokens: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: "https://i.stack.imgur.com/l60Hf.png"
    },
    bundle: {
        type: String,
        default: 'none'
    },
    
}, {unique: true});


const User = mongoose.model('User', userSchema);
module.exports = User;