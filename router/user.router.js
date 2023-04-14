const express = require('express');
const router = express.Router();
const {updateUserTokens} = require('../controllers/user.controller')


router.route('/updateUser')
        .post(updateUserTokens)



module.exports = router