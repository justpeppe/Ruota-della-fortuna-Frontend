export const generateBoardMatrix = (phrase) => {
  const ROW_LENGTHS = [12, 14, 14, 12];
  const words = phrase.toUpperCase().split(' ');

  let neededRows = 0;
  let tIdx = 0;
  while (tIdx < words.length && neededRows < 4) {
    let currentLine = "";
    while (tIdx < words.length) {
      const word = words[tIdx];
      const spaceNeeded = currentLine.length === 0 ? word.length : currentLine.length + 1 + word.length;
      if (spaceNeeded <= ROW_LENGTHS[neededRows]) {
        currentLine += (currentLine.length === 0 ? "" : " ") + word;
        tIdx++;
      } else {
        break;
      }
    }
    neededRows++;
  }

  const targetRow = neededRows <= 2 ? 1 : 0;
  let wordIdx = 0;
  const rows = [[], [], [], []];

  for (let r = targetRow; r < 4 && wordIdx < words.length; r++) {
    let currentLine = "";
    while (wordIdx < words.length) {
      const word = words[wordIdx];
      const spaceNeeded = currentLine.length === 0 ? word.length : currentLine.length + 1 + word.length;

      if (spaceNeeded <= ROW_LENGTHS[r]) {
        currentLine += (currentLine.length === 0 ? "" : " ") + word;
        wordIdx++;
      } else {
        break;
      }
    }
    rows[r] = currentLine.split('');
  }

  const matrix = rows.map((content, r) => {
    const rowLen = ROW_LENGTHS[r];
    const rowArray = new Array(14).fill(null);
    const missingSlotsSide = (14 - rowLen) / 2;

    if (content && content.length > 0) {
      const contentPadding = Math.floor((rowLen - content.length) / 2);
      const startOffset = missingSlotsSide + contentPadding;

      content.forEach((char, i) => {
        rowArray[startOffset + i] = { char, isActive: true };
      });
    }

    return rowArray.map((cell, c) => {
      const isMissingSlot = c < missingSlotsSide || c >= (14 - missingSlotsSide);
      return cell || { char: null, isActive: false, isMissingSlot };
    });
  });

  return matrix;
};
