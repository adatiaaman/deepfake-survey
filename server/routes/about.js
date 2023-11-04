const express = require('express');
const { addAbout } = require('../controllers/aboutController.js');
const router = express.Router();

router.post('/addAbout', addAbout);

module.exports = {
    routes: router
}