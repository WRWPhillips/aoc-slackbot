const axios = require("axios");
const ck = require("ckey");

let slackWebHook = ck.WEBHOOK_URL;

function postMessages(message) {

    axios.post(slackWebHook, {
        "text": message
    }).then(r => {
        console.log(r);
    }).catch(e => {
        console.log(e);
    });
}

module.exports = postMessages;
