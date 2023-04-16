const express = require('express');
const router = express.Router();
const {addPromoCode, getAllPromoCode, deletePromoCode, checkPromoCode} = require('../controllers/promoCode.controller')



router.route('/addPromocode')
        .post(addPromoCode)

router.route('/getPromocode')
        .post(getAllPromoCode)

router.route('/deletePromocode')
        .post(deletePromoCode)

router.route('/checkPromocode')
        .post(checkPromoCode)


module.exports = router