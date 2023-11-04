
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

let last_index = -1;
let clientIdMap = new Map();

const getVideos = async (req, res) => {
    try {
        const clientId = req.body.clientId;
        const bucketName = 'deepfake-survey.appspot.com';

        if (!clientIdMap.has(clientId)) {
            clientIdMap.set(clientId, last_index + 1);
            last_index = (last_index + 1) % 10
        }

        const files = await getStorage().bucket(bucketName).getFiles({ prefix: `${clientIdMap.get(clientId)}/` })

        const downloadURLs = [];
        downloadURLs.push({"group_id" : `${clientIdMap.get(clientId)}` })

        for (const file of files[0]) {
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '01-01-2100'
            });
            downloadURLs.push(url);
        }

        res.status(200).send(downloadURLs);

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getVideos
}
