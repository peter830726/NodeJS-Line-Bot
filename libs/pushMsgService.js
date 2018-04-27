const lineClient = require('../libs/lineBotService').client;

let push = (msg) => {
    lineClient.pushMessage();
}

let reply = (msg)=>{

}

module.exports = {
    push: push
}