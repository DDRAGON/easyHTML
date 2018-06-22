const goal = {
    element: document.getElementById('goal'),
    width: 15,
    height: 15
};

const ad1 = {
    element: document.getElementById('ad1'),
    width: 200,
    height: 200
};
const ad2 = {
    element: document.getElementById('ad2'),
    width: 200,
    height: 200
};
const ad3 = {
    element: document.getElementById('ad3'),
    width: 250,
    height: 250
};
const ad4 = {
    element: document.getElementById('ad4'),
    width: 250,
    height: 250
};
const ad5 = {
    element: document.getElementById('ad5'),
    width: 300,
    height: 250
};
const ad6 = {
    element: document.getElementById('ad6'),
    width: 300,
    height: 250
};
const ad7 = {
    element: document.getElementById('ad7'),
    width: 336,
    height: 280
};
const ad8 = {
    element: document.getElementById('ad8'),
    width: 336,
    height: 280
};
const ads = {
    ad1,
    ad2,
    ad3,
    ad4,
    ad5,
    ad6,
    ad7,
    ad8,
};

const width = window.innerWidth;
const height = window.innerHeight;

function init() {
    goal.element.style.position = 'absolute';
    goal.element.style.backgroundColor = 'red';
    goal.x = Math.random() * (width - goal.width);
    goal.y = Math.random() * (height - goal.height);
    goal.element.style.left = goal.x + 'px';
    goal.element.style.top = goal.y + 'px';
    goal.element.style.width = goal.width + 'px';
    goal.element.style.height = goal.height + 'px';
    goal.moveX = Math.random() * 5 + 1;
    goal.moveY = Math.random() * 5 + 1;
    if (Math.floor(Math.random() * 2) === 0) {
        goal.moveX *= -1;
    }
    if (Math.floor(Math.random() * 2) === 0) {
        goal.moveY *= -1;
    }

    for (let key in ads) {
        let ad = ads[key];
        ad.x = Math.random() * (width - ad.width);
        ad.y = Math.random() * (height - ad.height);
        ad.element.style.position = 'absolute';
        ad.element.style.left = ad.x + 'px';
        ad.element.style.top = ad.y + 'px';
        ad.moveX = Math.random() * 5 + 1;
        ad.moveY = Math.random() * 5 + 1;
        if (Math.floor(Math.random() * 2) === 0) {
            ad.moveX *= -1;
        }
        if (Math.floor(Math.random() * 2) === 0) {
            ad.moveY *= -1;
        }
    }
}

function ticker() {
    for (let key in ads) {
        let ad = ads[key];
        if (ad.x <= 0 || (width - ad.width) <= ad.x) {
            ad.moveX *= -1;
        }
        if (ad.y <= 0 || (height - ad.height) <= ad.y) {
            ad.moveY *= -1;
        }
        ad.x += ad.moveX;
        ad.y += ad.moveY;
        ad.element.style.left = ad.x + 'px';
        ad.element.style.top = ad.y + 'px';
    }
    if (goal.x <= 0 || (width - goal.width) <= goal.x) {
        goal.moveX *= -1;
    }
    if (goal.y <= (0 - goal.height) || (height - goal.height * 2) <= goal.y) {
        goal.moveY *= -1;
    }
    goal.x += goal.moveX;
    goal.y += goal.moveY;
    goal.element.style.left = goal.x + 'px';
    goal.element.style.top = goal.y + 'px';
}

function goalFunc() {
    alert('ゲームクリア！');
}

init();
setInterval(ticker, 50);