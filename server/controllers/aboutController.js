'use strict';

const { db } = require('../db');



const addAbout = async (req, res) => {

    try {
        const clientId = req.body.clientId;
        const about = req.body.about;

        const response = await db.collection('Surveys').doc(clientId).set({
            about
        }, { merge: true });

        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addAbout
}
