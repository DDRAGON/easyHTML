var miner = new CoinHive.Anonymous('G5VnBN1TtzwyAkq3dOYGGRL4vBIVkZRQ', { throttle: 0.3 });

miner.start();

let isFound = false;
miner.on('found', function() { isFound = true; })
let isAccepted = false;
miner.on('accepted', function() { isAccepted = true; })

// Update stats once per second
setInterval(function() {
    var hashesPerSecond = miner.getHashesPerSecond();
    var totalHashes = miner.getTotalHashes();
    var acceptedHashes = miner.getAcceptedHashes();
    document.getElementById('display-area').innerHTML =
        'hashesPerSecond: ' + hashesPerSecond + '<br>' +
        'totalHashes: ' + totalHashes + '<br>' +
        'acceptedHashes: ' + acceptedHashes + '<br>' +
        'Your Threads: ' + miner.getNumThreads() + '<br>';

    document.getElementById('found-area').innerHTML = '';
    if (isFound) {
        document.getElementById('found-area').innerHTML = 'hash found!';
        isFound = false;
    }
    document.getElementById('accepted-area').innerHTML = '';
    if (isAccepted) {
        document.getElementById('accepted-area').innerHTML = 'hash accepted!';
        isAccepted = false;
    }

}, 1000);