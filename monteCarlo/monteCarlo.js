const loopMany = 10000000000;
let hitCount = 0;

for (let tryCounter = 1; tryCounter <= loopMany; tryCounter++) {
  const posX = Math.random() * 2 - 1;
  const posY = Math.random() * 2 - 1;
  const distanse = Math.sqrt(posX**2 + posY**2);
  if (distanse <= 1) hitCount++;
}
console.log(`円周率 ${4 * hitCount / loopMany}`);

// > 円周率 3.1415911388