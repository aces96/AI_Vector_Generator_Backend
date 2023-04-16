const express = require('express');
const router = express.Router();
const {getAdmin, addAdmin} = require('../controllers/admin.controller')


router.route('/getAdmin')
        .post(getAdmin)

router.route('/addAdmin')
        .post(addAdmin)

module.exports = router