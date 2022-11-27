

function getMessages(obj1, obj2, diffKeyArr) {

	msgArr = diffKeyArr.map((member) => {
		let oldStars = parseInt(obj1[member]["stars"]);
		let newStars = parseInt(obj2[member]["stars"]);
		let starDelta = newStars - oldStars;
		let name = obj2[member]["name"];

			if(oldStars < newStars) {
			return `${name} just got ${starDelta} more star${starDelta > 1 ? "s" : ""}!`;
		}
	});
	
	return msgArr;
}

module.exports = getMessages;
