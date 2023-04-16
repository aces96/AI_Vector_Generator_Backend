const express = require('express');
const router = express.Router();
const {addPromoCode, getAllPromoCode, deletePromoCode} = require('../controllers/promoCode.controller')



router.route('/addPromocode')
        .post(addPromoCode)

router.route('/getPromocode')
        .post(getAllPromoCode)

router.route('/getPromocode')
        .post(deletePromoCode)


module.exports = router