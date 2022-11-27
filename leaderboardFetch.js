const fs = require('fs');
const ck = require('ckey');

const axiosCookieStub = require('./utils/axiosCookieStub');

const cookie = ck.AOC_COOKIE;
const boardUserId = ck.AOC_BOARD_USER_ID;

axios = axiosCookieStub(cookie);

async function getLeaderBoardFromLocal() {
  let board;
  try {
    board = await fs.promises.readFile('./temp/leaderboard.json');
  } catch (err) {
    console.log(err);
  }

  return JSON.parse(board);
}

async function getLeaderBoard() {
  let board;
  try {
    board = await axios.get(`https://adventofcode.com/${new Date().getFullYear()}/leaderboard/private/view/${boardUserId}.json`,
    );
  } catch (err) {
    console.log(err);
  }
  return board.data;
}

function writeBoardToLocal(board) {
  fs.writeFile('./temp/leaderboard.json', JSON.stringify(board), (err) => {
    if (err) console.log(err);
    console.log('New file written');
  });
}

module.exports = {getLeaderBoardFromLocal, getLeaderBoard, writeBoardToLocal};
