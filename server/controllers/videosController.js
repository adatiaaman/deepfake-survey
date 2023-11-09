'use strict';

const { db } = require('../db');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

// let last_index = -1;
let clientIdMap = new Map();

const getVideos = async (req, res) => {
    try {
        const clientId = req.body.clientId;
        const bucketName = 'deepfake-survey.appspot.com';

        if (!clientIdMap.has(clientId)) {
            let last_index = await (await db.collection('GroupId').doc('fix').get()).data()["last_index"]
            clientIdMap.set(clientId, (last_index + 1)%10);
            last_index = (last_index + 1) % 10
            await db.collection('Surveys').doc(clientId).set({
                "group_id": `${clientIdMap.get(clientId)}`
            }, { merge: true });
            await db.collection('GroupId').doc('fix').set({
                "last_index": last_index
            }, { merge: true });
        }

        const files = await getStorage().bucket(bucketName).getFiles({ prefix: `${clientIdMap.get(clientId)}/` })

        let downloadURLs = {};
        downloadURLs["group_id"] = `${clientIdMap.get(clientId)}` ;

        const urls = [];
        for (const file of files[0]) {
            const durl = await getDownloadURL(file);
            urls.push(durl);
        }
    
        urls.shift()
        downloadURLs["urls"] = urls;

        res.status(200).send(downloadURLs);

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getVideos
}
