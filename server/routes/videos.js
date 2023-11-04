const express = require('express');
const {getVideos} = require('../controllers/videosController.js');
const router = express.Router();

router.post('/getVideos', getVideos);

module.exports = {
    routes: router
}