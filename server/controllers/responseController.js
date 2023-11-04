'use strict';

const { db } = require('../db');



const saveResponse = async (req, res) => {

    try {
        const clientId = req.body.clientId;
        const details = req.body.resp.details;
        

        const response = await db.collection('Surveys').doc(clientId).set({
            details
        }, { merge: true });

        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    saveResponse
}
