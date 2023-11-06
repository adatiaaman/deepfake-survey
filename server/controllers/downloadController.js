'use strict';

const { db } = require('../db');
const fs = require('fs');


const downloadResponse = async (req, res) => {

    try {
        const clientId = req.body.clientId;
        

        const response = await db.collection('Surveys').doc(clientId).get();
        const data = await response.data();
        const text = JSON.stringify(data, null, 2);
        fs.writeFileSync('output/output.json', text, 'utf-8');

        res.status(200).send('DONE');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    downloadResponse
}
