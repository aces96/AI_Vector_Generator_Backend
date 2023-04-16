const mongoose = require('mongoose');


const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String
    }
})



const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
module.exports = PromoCode;