const { DOMAIN_URL } = require('../config/constant');
const lineClient = require('../libs/lineBotService').client,
    messageObject = require('../libs/messageObject');
const co = require('co'),
    fs = require('fs');


let parseEvent = (event) => {
    var eventType = null;
    if (!event.message) {
        eventType = event.type;
    } else {
        eventType = event.message.type;
    }

    let eventTypes = {
        'text': parseText,
        'sticker': parseSticker,
        'image': parseImage,
        'video': parseVideo,
        'audio': 'audio',
        'location': 'location',
        'imagemap': 'imagemap',
        'template': 'template',
        'join': 'join',
        'postback': parsePostback
    };
    return eventTypes[eventType](event);
}

let parseText = (textMessage) => {
    return co(function* () {
        try {
            var text = textMessage.message.text;
            if (text === '123') {
                return [{
                    type: 'text',
                    text: "這是文字訊息"
                }];
            }

        } catch (e) {

        }
    })
}

let parseSticker = (stickerMessage) => {
    return co(function* () {
        try {
            var stickerId = stickerMessage.message.stickerId;
            var packageId = stickerMessage.message.packageId;
            return [
                messageObject.stickerMessage(packageId, stickerId),
                messageObject.textMessage('歡迎來到熊大寶殿')
            ];
        } catch (e) {

        }
    })
}

let parseImage = (imageMessage) => {
    return co(function* () {
        try {
            let messageId = imageMessage.message.id;
            let stream = yield lineClient.getMessageContent(messageId);
            let path = 'resource/image';
            let fileName = '123';
            let writable = fs.createWriteStream(`${path}/${fileName}.jpg`);
            stream.pipe(writable);
        } catch (e) {
            console.log(e);
        }
    })
}

let parseVideo = (videoMessage) => {
    return co(function* () {
        try {
            let messageId = videoMessage.message.id;
            console.info('messageId', messageId);
            let stream = yield lineClient.getMessageContent(messageId);
            let fileName = '123.avi';
            let writable = fs.createWriteStream(`${fileName}`);
            stream.pipe(writable);
        } catch (e) {

        }
    })
}

let parsePostback = (postBackMessage) => {
    return co(function* () {
        try {
            console.info(postBackMessage);
        } catch (e) {

        }
    })
}

let handleEvent = (event) => {
    co(function* () {
        let UID = event.source.userId;
        let replyToken = event.replyToken;
        console.log(event);
        let message = yield parseEvent(event);
        if (message !== undefined) {
            return lineClient.replyMessage(replyToken, message);
        }
    })
}

module.exports = {
    handleEvent: handleEvent
}