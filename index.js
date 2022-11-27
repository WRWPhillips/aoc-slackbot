const cron = require('node-cron');

const {
	getLeaderBoardFromLocal, 
	getLeaderBoard, 
	writeBoardToLocal
} = require('./leaderboardFetch');
const getObjectDiff = require('./utils/getObjectDiff');
const getMessages = require('./utils/messageHandler');
const postMessages = require('./utils/postMessages');

cron.schedule('*/15 * * * *', () => {
  tryCompare();
});

cron.schedule('0 0 1-25 12 *', () => {
  postMessages(`It is now the ${dayCodes[new Date.getDate()]} of December, and our ${dayCodes[new Date.getDate()]} challenge is now live. Good luck!`);
});

async function tryCompare() {
  const prevBoard = await getLeaderBoardFromLocal();
  const nextBoard = await getLeaderBoard();

  let diff = getObjectDiff(prevBoard['members'], nextBoard['members']);

  if (diff.length > 0) {
    const prevMembers = Object.keys(prevBoard['members']);
    const nextMembers = Object.keys(nextBoard['members']);
    const newMembers = nextMembers.filter( (x) => !prevMembers.includes(x));
    const newMemberMessages = newMembers.map((member) => {
      return `${nextBoard['members'][member].name} just joined the leaderboard!`;
    });

    diff = diff.filter( (member) => !newMembers.includes(member));

    const messages = getMessages(prevBoard['members'], nextBoard['members'], diff);
    messages.push.apply(messages, newMemberMessages);

    postMessages('We have an update for Kitestring Advent of Code: \n' + messages.join(' \n'));

    writeBoardToLocal(nextBoard);
  } else {
    console.log('They are the same');
  }
}

const dayCodes = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
  6: 'sixth',
  7: 'seventh',
  8: 'eighth',
  9: 'ninth',
  10: 'tenth',
  11: 'eleventh',
  12: 'twelfth',
  13: 'thirteenth',
  14: 'fourteenth',
  15: 'fifteenth',
  16: 'sixteenth',
  17: 'seventeenth',
  18: 'eighteenth',
  19: 'nineteenth',
  20: 'twentieth',
  21: 'twenty first',
  22: 'twenty second',
  23: 'twenty third',
  24: 'twenty fourth',
  25: 'twenty fifth and LAST',
};

postMessages('slackbot launching!!!!');

tryCompare();
