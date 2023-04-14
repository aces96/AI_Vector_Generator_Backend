const express = require('express');
const router = express.Router();
const {getHistoryByUser} = require('../controllers/history.controller')



router.route("/getHistory")
        .post(getHistoryByUser)


module.exports = router