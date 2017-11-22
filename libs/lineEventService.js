const lineClient = require('../libs/lineBotService').client;
const co = require('co');
const fs = require('fs');
const direct='../';

let parseEvent = (event) => {
    var eventType = event.message.type;
    let eventTypes = {
        'text': parseText,
        'sticker': parseSticker,
        'image': parseImage,
        'video': parseVideo,
        'audio': 'audio',
        'location': 'location',
        'imagemap': 'imagemap',
        'template': 'template'
    };
    return eventTypes[eventType](event);
}

let parseText = (textMessage) => {
    return co(function* () {
        try {
            return {
                type: 'text',
                text: "這是文字訊息"
            };
        } catch (e) {

        }
    })
}

let parseSticker = (stickerMessage) => {
    return co(function* () {
        try {
            console.info('@@@@this is sticker message');
        } catch (e) {

        }
    })
}

let parseImage = (imageMessage) => {
    return co(function* () {
        try {
            let messageId = imageMessage.message.id;
            let stream = yield lineClient.getMessageContent(messageId);
            let fileName = '123';
            let writable = fs.createWriteStream(`${fileName}.jpg`);
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
            console.info('messageId',messageId);
            let stream = yield lineClient.getMessageContent(messageId);
            let fileName = '123.avi';
            let writable = fs.createWriteStream(`${fileName}`);
            stream.pipe(writable);
        } catch (e) {

        }
    })
}

let handleEvent = (event) => {
    co(function* () {
        let UID = event.source.userId;
        let replyToken = event.replyToken;
        console.info(event);
        let message = yield parseEvent(event);
        // return lineClient.replyMessage(replyToken, message);
    })
}

module.exports = {
    handleEvent: handleEvent
}