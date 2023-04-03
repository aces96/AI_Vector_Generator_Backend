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
    google_id:{
        type: String
    },
    secret: {
        type: String
    },
    credits: {
        type: Number,
        default: 0
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;