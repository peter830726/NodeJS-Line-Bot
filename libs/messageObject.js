const {DOMAIN_URL} = require('../config/constant');

let textMessage = (text) => {
    return {
        type: 'text',
        text: text
    }
};

let stickerMessage = (packageId, stickerId) => {
    return {
        "type": "sticker",
        "packageId": packageId,
        "stickerId": stickerId
    }
}

let imageMessage = (originalContentUrl, previewImageUrl) => {
    return {
        "type": "image",
        "originalContentUrl": originalContentUrl,
        "previewImageUrl": previewImageUrl
    }
}

let audioMessage = (originalContentUrl, duration) => {
    //duration 顯示播放時間,但若小於或大於原本長度,還是會將音檔撥放完畢
    return {
        "type": "audio",
        "originalContentUrl": originalContentUrl,
        "duration": duration
    }
}

let locationMessage = () => {
    return {
        "type": "location",
        "title": "my location",
        "address": "東京都渋谷区渋谷２丁目２１−１",
        "latitude": 35.65910807942215,
        "longitude": 139.70372892916203
    }
}
let imagemapMessage = () => {
    return {
        "type": "imagemap",
        "baseUrl": `${DOMAIN_URL}/public/image_map`,
        "altText": "This is an imagemap",
        "baseSize": {
            "height": 1040,
            "width": 1040
        },
        "actions": [
            {
                "type": "uri",
                "linkUri": "https://www.google.com/",
                "area": {
                    "x": 0,
                    "y": 0,
                    "width": 520,
                    "height": 1040
                }
            },
            {
                "type": "message",
                "text": "Hello",
                "area": {
                    "x": 520,
                    "y": 0,
                    "width": 520,
                    "height": 1040
                }
            }
        ]
      }
}

let templateMessage = () => {
    return {
        "type": "template",
        "altText": "this is a image carousel template",
        "template": {
            "type": "image_carousel",
            "columns": [
                {
                    "imageUrl": "https://example.com/bot/images/item3.jpg",
                    "action": {
                        "type": "uri",
                        "label": "View details",
                        "uri": "https://example.com/bot/images/item3.jpg"

                    }
                }
            ]
        }
    }
}

module.exports = {
    textMessage: textMessage,
    stickerMessage: stickerMessage,
    imageMessage: imageMessage,
    audioMessage: audioMessage,
    locationMessage: locationMessage,
    imagemapMessage: imagemapMessage,
    templateMessage: templateMessage
}