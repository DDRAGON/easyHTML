
function findMyReach(color, cellNum, field) {
  // 横チェック
  let nonePositionX = null;
  let nonePositionY = null;

  for (let y = 0; y < cellNum; y++) { // 3行ループでまとめてチェック
    let colorNum = 0;
    let noneNum = 0;
    for (let x = 0; x < cellNum; x++) { 
      if (field[y][x] === color) {
        colorNum++;
        continue;
      }
      if (field[y][x] === '無') {
        noneNum++;
        nonePositionX = x;
        nonePositionY = y;
        continue;
      }
    }

    // リーチがあったとき。
    if (colorNum == cellNum - 1 && noneNum === 1) {
      return {
        result: true,
        nonePositionX,
        nonePositionY
      }
    }
  }

   // 縦チェック
  for (let x = 0; x < cellNum; x++) { // 3列ループでまとめてチェック
    let colorNum = 0;
    let noneNum = 0;
    for (let y = 0; y < cellNum; y++) { 
      if (field[y][x] === color) {
        colorNum++;
        continue;
      }
      if (field[y][x] === '無') {
        noneNum++;
        nonePositionX = x;
        nonePositionY = y;
        continue;
      }
    }

    // リーチがあったとき。
    if (colorNum == cellNum - 1 && noneNum === 1) {
      return {
        result: true,
        nonePositionX,
        nonePositionY
      }
    }
  }

  // 斜めチェック
  let colorNum = 0;
  let noneNum = 0;
  for (let x=0, y=0; x < cellNum; x++, y++) {
    
    if (field[y][x] === color) {
      colorNum++;
      continue;
    }
    if (field[y][x] === '無') {
      noneNum++;
      nonePositionX = x;
      nonePositionY = y;
      continue;
    }
  }

  // リーチがあったとき。
  if (colorNum == cellNum - 1 && noneNum === 1) {
    return {
      result: true,
      nonePositionX,
      nonePositionY
    }
  }


  // 逆斜めチェック
  colorNum = 0;
  noneNum = 0;
  for (let x=cellNum-1, y=0; y < cellNum; x--, y++) {

    if (field[y][x] === color) {
      colorNum++;
      continue;
    }
    if (field[y][x] === '無') {
      noneNum++;
      nonePositionX = x;
      nonePositionY = y;
      continue;
    }
  }

  // リーチがあったとき。
  if (colorNum == cellNum - 1 && noneNum === 1) {
    return {
      result: true,
      nonePositionX,
      nonePositionY
    }
  }

  return false;
}


function findMyWin(color, cellNum, field) {
  // 横チェック
  for (let y = 0; y < cellNum; y++) { // 3行ループでまとめてチェック
    let colorNum = 0;
    for (let x = 0; x < cellNum; x++) { 
      if (field[y][x] === color) colorNum++;
    }

    // 勝ちがあったとき。
    if (colorNum === cellNum) return true;
  }

   // 縦チェック
  for (let x = 0; x < cellNum; x++) { // 3列ループでまとめてチェック
    let colorNum = 0;
    for (let y = 0; y < cellNum; y++) { 
      if (field[y][x] === color) colorNum++;
    }

    // 勝ちがあったとき。
    if (colorNum === cellNum) return true;
  }

  // 斜めチェック
  let colorNum = 0;
  for (let x=0, y=0; x < cellNum; x++, y++) {
    if (field[y][x] === color) colorNum++;
  }

  // 勝ちがあったとき。
  if (colorNum == cellNum) return true;


  // 逆斜めチェック
  colorNum = 0;
  for (let x=cellNum-1, y=0; y < cellNum; x--, y++) {
    if (field[y][x] === color) colorNum++;
  }

  // 勝ちがあったとき。
  if (colorNum == cellNum) return true;

  return false;
}



function monteCarloCalc(myColor, cellNum, field) {

  let opColor = '黒';
  if (myColor === '黒') opColor = '白';

  if (findMyWin(myColor, cellNum, field) === true) {
    config.trialsCounter += 1;
    if (myColor === '白') config.whiteWinCounter += 1;
    if (myColor === '黒') config.blackWinCounter += 1;
    return;
  }

  if (findMyWin(opColor, cellNum, field) === true) {
    config.trialsCounter += 1;
    if (opColor === '白') config.whiteWinCounter += 1;
    if (opColor === '黒') config.blackWinCounter += 1;
    return;
  }

  let positionOptions = [];
  let noneCounter = 0;
  for(let x = 0; x < cellNum; x++) {
    for(let y = 0; y < cellNum; y++) {
      if(field[y][x] === '無') {
        positionOptions.push({x: x, y: y});
        noneCounter += 1;
      }
    }
  }
  if(noneCounter === 0) {
    config.trialsCounter += 1;
    config.tieCounter += 1;
    return;
  }

  // 勝敗が決まっていない時はランダムにコマを置き、手番を入れ替える
  const putPosition = positionOptions[Math.floor(Math.random() * positionOptions.length)];
  field[putPosition.y][putPosition.x] = myColor;
  monteCarloCalc(opColor, cellNum, field);
}


function startMonteCarloLoop(config, myColor, cellNum, field) {
  config.trialsCounter = 0;
  config.whiteWinCounter = 0;
  config.blackWinCounter = 0;
  config.tieCounter = 0;
  config.checkFlag = true;
  config.calcStartTime = new Date().getTime();

  while((new Date().getTime() - config.calcStartTime) <= 1000 * 3) {
    monteCarloCalc(myColor, cellNum, JSON.parse(JSON.stringify(field)));
  }
  return config;
}


/**
 * 
 * @param {String} tebanColor 
 * @param {Number} cellNum 
 * @param {Array} field 
 */
function get1stepTrialFields(tebanColor, cellNum, field) {
  const nest1StepObjs = [];
  for (let y = 0; y < cellNum; y++) {
    for (let x = 0; x < cellNum; x++) {
      if (field[y][x] === '無') {
        const nest1StepField = JSON.parse(JSON.stringify(field));
        nest1StepField[y][x] = tebanColor;
        nest1StepObjs.push(
          {
            move: { x, y },
            nest1StepField
          }
        );
      }
    }
  }

  let nextTebanColor = '黒';
  if (tebanColor === '黒') nextTebanColor = '白';

  return {
    nextTebanColor,
    nest1StepObjs
  }
}