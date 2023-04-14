const mongoose = require('mongoose');
const moment = require('moment')

const historySchema = new mongoose.Schema({
    prompt: {
        type: String,
    },
    images: {
        type: [String],
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
});


const History = mongoose.model('History', historySchema);
module.exports = History;