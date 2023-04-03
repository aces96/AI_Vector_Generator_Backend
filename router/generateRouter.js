const express = require('express');
const router = express.Router();
const {generateVectors} = require('../controllers/generator.controller')



router.route('/generateVector')
    .post(generateVectors)


module.exports = router