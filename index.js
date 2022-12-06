const Cron = require('croner');
const express = require('express');
const ck = require('ckey');

const {
	getLeaderBoardFromLocal, 
	getLeaderBoard, 
	writeBoardToLocal
} = require('./leaderboardFetch');

const getObjectDiff = require('./utils/getObjectDiff');

const { 
	getMessages, 
	getRankingMessage 
} = require('./utils/messageHandler');

const postMessages = require('./utils/postMessages');

Cron('*/30 * * * *', function() {
  tryCompare();
  let date = new Date();
  console.log(date.getMonth() + ":" + date.getDate() + ":" + date.getHours() + ":" + date.getMinutes())
});

Cron('30 23 1-25 DEC *', { timezone: "America/New_York" }, function() {
  leaderboard();
});

Cron('1 0 1-25 DEC *', { timezone: "America/New_York" }, function() {
  let date = new Date();
  postMessages(`It is now the ${dayCodes[date.getDate()]} of December (eastern time), and our ${dayCodes[date.getDate()]} challenge is now live. Good luck!`);
});

Cron('0 9 1-25 DEC *', { timezone: "America/New_York" }, function() {
  let date = new Date();
  postMessages(` ******************DAILY SOLUTION THREAD****************** \n Feel free to post and discuss your day ${date.getDate() - 1} solutions below!`)
})

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

    postMessages('We have an update for Kitestring Advent of Code: \n' + messages.join(' \n') + newMemberMessages.join(' \n'));

    writeBoardToLocal(nextBoard);
  } else {
    console.log('They are the same');
  }
}

async function leaderboard() {
	const board = await getLeaderBoardFromLocal();
	let date = new Date();

	postMessages(`Here are the rankings so far for the ${dayCodes[date.getDate()]} day of Advent of Code. \n Remember that ranking is determined by number of stars, and points are only used as a tie breaker, so it's not too late! \n The leaderboard for today is: \n ${getRankingMessage(board)}`);
}

const app = express();
const port = ck.PORT;

app.listen(port || 8080, () => {
  console.log('listening on port ' + port)
});

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