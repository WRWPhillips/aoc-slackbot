const axios = require('axios');
const ck = require('ckey');

const slackWebHook = ck.WEBHOOK_URL;

function postMessages(message) {
  axios.post(slackWebHook, {
    'text': message,
  }).catch((e) => {
    console.log(e);
  });
}

module.exports = postMessages;
