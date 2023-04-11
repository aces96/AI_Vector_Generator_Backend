const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User must have a name']
    },
    email: {
        type: String,
        required: [true, 'A User must have an email'],
        unique: true,
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
        type: String
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;