const ck = require('ckey');
const e = require('express');
const Redis = require('ioredis');

const axiosCookieStub = require('./utils/axiosCookieStub');

const cookie = ck.AOC_COOKIE;
const boardUserId = ck.AOC_BOARD_USER_ID;
const redisUrl = ck.REDIS_URL;

const client = new Redis(redisUrl, {family: 6, lazyConnect: true});

client.on('connect', function() {
	console.log('Connected!');
});


client.on('disconnect', function() {
	console.log('Disconnected!');
});

client.on('error', (err) => console.log('Redis Client Error', err));

const axios = axiosCookieStub(cookie);

async function getLeaderBoardFromLocal() {
  let board;

  try {	
  	await client.connect();
  	board = await client.get('board');
	console.log(board);
	return JSON.parse(board);
} catch(err) {
	console.log(err);
  } finally {
	await client.disconnect();
  }
}

async function getLeaderBoard() {
  let board;
  try {
    board = await axios.get(
		`https://adventofcode.com/${new Date().getFullYear()}/leaderboard/private/view/${boardUserId}.json`
    );
  } catch (err) {
    console.log(err);
  }	
  return board.data;
}

async function writeBoardToLocal(board) {
  await client.connect();

  client.set('board', JSON.stringify(board), (err, reply) => {
    if (err) {
		console.log(err);
	} else {
    console.log('New file written ' + reply);
	}
  });

  await client.disconnect();
}

module.exports = {getLeaderBoardFromLocal, getLeaderBoard, writeBoardToLocal};
