const express = require('express');
const { saveResponse } = require('../controllers/responseController.js');
const router = express.Router();

router.post('/save', saveResponse);

module.exports = {
    routes: router
}