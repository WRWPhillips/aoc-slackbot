

function getMessages(obj1, obj2, diffKeyArr) {
  msgArr = diffKeyArr.map((member) => {
    const oldStars = parseInt(obj1[member]['stars']);
    const newStars = parseInt(obj2[member]['stars']);
    const starDelta = newStars - oldStars;
    const name = obj2[member]['name'];

    if (oldStars < newStars) {
      return `${name} just got ${starDelta} more star${starDelta > 1 ? 's' : ''}!`;
    }
  });

  return msgArr;
}

function getRankingMessage(board) {
	let rankings = []
	const keys = Object.keys(board["members"]);
	for (let i = 0; i < keys.length; i++) {
		const record = board.members[keys[i]];
		rankings.push(record);
	}

	return rankings.sort((a, b) => (a.local_score < b.local_score) ? 1 : -1).map((playerObj, i) => {
		return `#${i + 1}: ${playerObj.name} has ${playerObj.local_score} points and ${playerObj.stars} stars.`
	}).join(" \n");
}

module.exports = {getMessages, getRankingMessage};
