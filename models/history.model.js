const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    prompt: {
        type: String,
    },
    images: {
        type: [String],
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


const History = mongoose.model('History', historySchema);
module.exports = History;