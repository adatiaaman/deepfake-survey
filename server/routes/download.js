const express = require('express');
const { downloadResponse } = require('../controllers/downloadController.js');
const router = express.Router();

router.post('/downloadResponse', downloadResponse);

module.exports = {
    routes: router
}