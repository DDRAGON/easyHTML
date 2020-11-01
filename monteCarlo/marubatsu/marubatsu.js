const worker = new Worker('worker.js');

// メッセージを送信する
worker.postMessage('こんにちは！');

const boxElements = [];
for (let i = 1; i <= 9; i++) {
  boxElements.push(document.getElementById(`box${i}`));
}

const wCellNum = 3;
const hCellNum = 3;

field = [[],[],[]];
let teban = '白';


function init() {
  for (let x = 0; x < wCellNum; x++) {
    for (let y = 0; y < hCellNum; y++) {
      field[y][x] = '無';
    }
  }
  teban = '白';
}

init();

const nest1StepObjs = get1stepTrialFields(teban, wCellNum, field);
console.log(nest1StepObjs);

const resultConfig = startMonteCarloLoop(config, teban, wCellNum, field);
console.log(`白の勝率：${resultConfig.whiteWinCounter / resultConfig.trialsCounter}`);
console.log(`黒の勝率：${resultConfig.blackWinCounter / resultConfig.trialsCounter}`);
console.log(`引き分け率：${resultConfig.tieCounter / resultConfig.trialsCounter}`);
let counter = 0;
for (let x = 0; x < wCellNum; x++) {
  for (let y = 0; y < hCellNum; y++) {
    boxElements[counter].innerText = field[y][x];
    counter += 1;
  }
}




