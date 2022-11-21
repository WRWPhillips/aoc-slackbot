const cron = require('node-cron');
const {getLeaderBoardFromLocal, getLeaderBoard, writeBoardToLocal, getObjectDiff} = require("./leaderboardFetch");

cron.schedule('*/15 * * * *', () => {
	tryCompare();
});

async function tryCompare() {
	const prevBoard = await getLeaderBoardFromLocal();
	const nextBoard = await getLeaderBoard();

	console.log("1" + JSON.stringify(prevBoard));
	console.log("2" + JSON.stringify(nextBoard));

	diff = getObjectDiff(prevBoard["members"], nextBoard["members"]);

	if(diff.length > 0) {
		console.log("Need to parse differences");
		diff.forEach(diff => console.log(diff));
		writeBoardToLocal(nextBoard); 
	} else {
		console.log("They are the same");
	}
}

tryCompare();

//getLeaderBoard();

//getLeaderBoardFromLocal();
