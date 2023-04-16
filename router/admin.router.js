const express = require('express');
const router = express.Router();
const {getAdmin} = require('../controllers/admin.controller')


router.route('/getAdmin')
        .post(getAdmin)


module.exports = router