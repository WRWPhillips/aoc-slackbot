

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

module.exports = getMessages;
