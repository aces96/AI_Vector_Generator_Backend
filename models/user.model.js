const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User must have a name']
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
        default: "https://www.freeiconspng.com/img/23479"
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;