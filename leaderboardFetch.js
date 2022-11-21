const fs = require("fs");
const ck = require("ckey");
const _ = require("lodash");

const axiosCookieStub = require("./utils/axiosCookieStub");

const cookie = ck.AOC_COOKIE;
const boardUserId = ck.AOC_BOARD_USER_ID;

axios = axiosCookieStub(cookie);

async function getLeaderBoardFromLocal() {
	let board;
	try { 
		board = await fs.promises.readFile("./temp/leaderboard.json")
	} catch(err) {
		console.log(err);
	}

	return JSON.parse(board);
}


async function getLeaderBoard() {
	let board;
	try { board = await axios.get(`https://adventofcode.com/${new Date().getFullYear()}/leaderboard/private/view/${boardUserId}.json`
	)} catch(err) {
		console.log(err);
	}
	return board.data;
}

function writeBoardToLocal(board) {
	fs.writeFile("./temp/leaderboard.json", JSON.stringify(board), (err) => {
		if (err) console.log(err);
		console.log("New file written");
	});
}

function getObjectDiff(board1, board2) {
    const diff = Object.keys(board1).reduce((result, key) => {
        if (!board2.hasOwnProperty(key)) {
            result.push(key);
        } else if (_.isEqual(board1[key], board2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(board2));

    return diff;
}

module.exports = {getLeaderBoardFromLocal, getLeaderBoard, writeBoardToLocal, getObjectDiff};
