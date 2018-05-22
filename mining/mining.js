var miner = new CoinHive.Anonymous('G5VnBN1TtzwyAkq3dOYGGRL4vBIVkZRQ', { throttle: 0.3 });

let XMRperHash = 0.00006313 / 1000000;

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

    if (rate !== false) {
        let xmr = (totalHashes * XMRperHash).toFixed(10);
        let yen = (xmr * rate).toFixed(10);
        document.getElementById('rate-area').innerHTML =
            '稼いだ XMR: ' + xmr + '<br>' +
            '稼いだ 円: ' + yen + '<br>' +
            '（円/XML: ' + rate + '）';
    }

}, 1000);


// レート算出
let rate = false;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=JPY");
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        rate = JSON.parse(xhr.responseText).JPY;
    }
};
xhr.send();