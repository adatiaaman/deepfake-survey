'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const videos = require('./routes/videos');
const response = require('./routes/response');
const about = require('./routes/about');
const download = require('./routes/download');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/videos', videos.routes);
app.use('/response', response.routes);
app.use('/about', about.routes);
app.use('/download', download.routes)

app.get('/', (req,res) => {
    res.send('Welcome to the Deepfake Survey');
});

app.listen(3000, () => console.log('App is listening on url http://localhost:' + 3000));