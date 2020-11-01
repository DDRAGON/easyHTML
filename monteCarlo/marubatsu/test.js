let field = [
  ['白', '白', '無'],
  ['無', '黒', '無'],
  ['無', '無', '黒']
];

let resultObj = findMyReach('白', 3, field);

console.assert(
  resultObj.result === true,
  'エラー1'
);
console.assert(
  resultObj.nonePositionX === 2,
  'エラー2'
);
console.assert(
  resultObj.nonePositionY === 0,
  'エラー3'
);
console.assert(
  findMyReach('黒', 3, field) === false,
  'エラー4'
);

field = [
  ['白', '黒', '白'],
  ['無', '無', '無'],
  ['白', '無', '黒']
];

resultObj = findMyReach('白', 3, field);

console.assert(
  resultObj.result === true,
  'エラー5'
);
console.assert(
  resultObj.nonePositionX === 0,
  'エラー6'
);
console.assert(
  resultObj.nonePositionY === 1,
  'エラー7'
);
console.assert(
  findMyReach('黒', 3, field) === false,
  'エラー8'
);

field = [
  ['白', '白', '白'],
  ['黒', '黒', '黒'],
  ['白', '無', '無']
];

console.assert(
  findMyReach('白', 3, field) === false,
  'エラー9'
);
console.assert(
  findMyReach('黒', 3, field) === false,
  'エラー10'
);

field = [
  ['黒', '白', '無'],
  ['黒', '黒', '白'],
  ['白', '無', '無']
];

console.assert(
  findMyReach('白', 3, field) === false,
  'エラー11'
);

resultObj = findMyReach('黒', 3, field);

console.assert(
  resultObj.result === true,
  'エラー12'
);
console.assert(
  resultObj.nonePositionX === 2,
  'エラー13'
);
console.assert(
  resultObj.nonePositionY === 2,
  'エラー14'
);


field = [
  ['無', '黒', '無'],
  ['黒', '白', '白'],
  ['白', '無', '無']
];

resultObj = findMyReach('白', 3, field);

console.assert(
  resultObj.result === true,
  'エラー15'
);
console.assert(
  resultObj.nonePositionX === 2,
  'エラー16'
);
console.assert(
  resultObj.nonePositionY === 0,
  'エラー17'
);

console.assert(
  findMyReach('黒', 3, field) === false,
  'エラー18'
);