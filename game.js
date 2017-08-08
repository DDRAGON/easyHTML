'use strict';

const windowWidth = 300;
const windowHeight = 500;
const game = {
    mouse: {},
    shooter: {},
    bullets: [],
    enemys: [],
    stars: [],
    score: { point: 0 },
    level: 1,
    infoBox: {}
};
let counter = 0;

function backgroundDraw() {
    if (Math.floor(Math.random() * Math.floor(20 / game.level)) <= 0) {
        const newStarX = Math.floor(Math.random() * windowWidth);
        const newStarSize = Math.floor(Math.random() * 8) + 8;
        const starObj = {};
        const newStar = document.createElement("span");
        newStar.innerHTML = "⭐️";
        newStar.style.color = '#EEEE00';
        newStar.style.position = "absolute";
        newStar.style.fontSize = newStarSize + 'px';
        newStar.style.left = newStarX + 'px';
        newStar.style.top = '-50px';
        starObj.size = newStarSize;
        starObj.x = newStarX;
        starObj.y = -10;
        starObj.element = newStar;

        game.stars.unshift(starObj);
        document.getElementById("game").appendChild(newStar);
    }

    for (let starKey in game.stars) {
        let starObj = game.stars[starKey];

        starObj.y += (1 + game.level);
        starObj.element.style.top = starObj.y + 'px';

        if (starObj.y > windowHeight) {
            game.stars.splice(starKey, 1);
            document.getElementById("game").removeChild(starObj.element);
        }
    }
}

function drawBullet() {
    if (counter % 3 === 0 && game.shooter.status !== 'dead') {
        const bulletObj = {
            x: game.shooter.x,
            y: game.shooter.y
        };
        const newBullet = document.createElement("span");
        newBullet.innerHTML = "❗️";
        newBullet.style.color = 'red';
        newBullet.style.position = "absolute";
        newBullet.style.fontSize = '12px';
        newBullet.style.left = bulletObj.x + 9 + 'px';
        newBullet.style.top = bulletObj.y + 'px';
        bulletObj.element = newBullet;

        game.bullets.unshift(bulletObj);
        document.getElementById("game").appendChild(newBullet);
    }

    game.bullets.forEach(function(bulletObj, bulletKey) {
        bulletObj.y -= 12;
        bulletObj.element.style.top = bulletObj.y + 'px';

        if (bulletObj.y < -20) {
            game.bullets.splice(bulletKey, 1);
            document.getElementById("game").removeChild(bulletObj.element);
        }
    });
}

function MouseMoveFunc(e) {
    if (game.shooter.status === 'dead') { return; }

    if (!game.mouse.x) {
        game.mouse.x = e.clientX;
    }
    if (!game.mouse.y) {
        game.mouse.y = e.clientY;
    }

    const moveX = e.clientX - game.mouse.x;
    const moveY = e.clientY - game.mouse.y;

    game.shooter.x += moveX;
    game.shooter.y += moveY;
    if (game.shooter.x <= 0) { game.shooter.x = 0; }
    if (game.shooter.x >= windowWidth - 25) { game.shooter.x = windowWidth - 25; }
    if (game.shooter.y <= 0) { game.shooter.y = 0; }
    if (game.shooter.y >= windowHeight - 40) { game.shooter.y = windowHeight - 40; }
    game.shooter.element.style.left = game.shooter.x + 'px';
    game.shooter.element.style.top = game.shooter.y + 'px';

    game.mouse.x = e.clientX;
    game.mouse.y = e.clientY;

    // 星のあたり判定
    game.stars.forEach(function(starObj, starKey) {
        if ( // 機体と星との衝突判定
            starObj.x - starObj.size - 14 <= game.shooter.x &&
            starObj.x + starObj.size + 0 >= game.shooter.x &&
            starObj.y - starObj.size - 20 <= game.shooter.y &&
            starObj.y + starObj.size - 6 >= game.shooter.y
        ) {
            game.shooter.status = 'dead';
            game.shooter.element.innerHTML = '💥';
        }
    });
}


function drawEnemy() {
    // 🌏
    if (Math.floor(Math.random() * (10 - Math.floor(game.level / 2))) <= 0) {
        const newEnemyX = Math.floor(Math.random() * windowWidth);
        const enemyObj = {};
        const newEnemy = document.createElement("span");
        newEnemy.innerHTML = "👾";
        newEnemy.style.color = '#800080';
        newEnemy.style.position = "absolute";
        newEnemy.style.fontSize = '30px';
        newEnemy.style.left = newEnemyX + 'px';
        newEnemy.style.top = '-50px';
        enemyObj.x = newEnemyX;
        enemyObj.y = -10;
        enemyObj.moveX = Math.floor(Math.random() * 11) - 5;
        enemyObj.moveY = Math.floor(Math.random() * 10) + 5;
        enemyObj.status = 'alive';
        enemyObj.score = 100;
        enemyObj.element = newEnemy;

        game.enemys.unshift(enemyObj);
        document.getElementById("game").appendChild(newEnemy);
    }

    game.enemys.forEach(function(enemyObj, enemyKey) {
        if (enemyObj.status == 'alive') {
            enemyObj.x += enemyObj.moveX;
            enemyObj.y += (enemyObj.moveY + game.level);
            enemyObj.element.style.left = enemyObj.x + 'px';
            enemyObj.element.style.top = enemyObj.y + 'px';

        } else if (enemyObj.status == 'dead') {
            game.enemys.splice(enemyKey, 1);
            document.getElementById("game").removeChild(enemyObj.element);
        }
    });
}

function checkConflict() {
    game.enemys.forEach(function(enemyObj, enemyKey) {
        game.bullets.forEach(function(bulletObj, bulletKey) {

            if ( // 弾との衝突判定
                enemyObj.x - 15 <= bulletObj.x &&
                enemyObj.x + 15 >= bulletObj.x &&
                enemyObj.y - 15 <= bulletObj.y &&
                enemyObj.y + 15 >= bulletObj.y
            ) {
                enemyObj.element.innerHTML = '💥';
                enemyObj.element.style.color = 'red';
                enemyObj.status = 'dead';
                game.bullets.splice(bulletKey, 1);
                document.getElementById("game").removeChild(bulletObj.element);

                addScore(enemyObj.score);
            }

        });

        if ( // 機体と敵との衝突判定
            enemyObj.x - 15 - 7 <= game.shooter.x &&
            enemyObj.x + 15 + 7 >= game.shooter.x &&
            enemyObj.y - 15 - 7 <= game.shooter.y &&
            enemyObj.y + 15 + 7 >= game.shooter.y
        ) {
            game.shooter.status = 'dead';
            game.shooter.element.innerHTML = '💥';
            game.shooter.element.style.color = 'red';
        }

        if (enemyObj.y >= windowHeight || enemyObj.x >= windowWidth - 15) {
            game.enemys.splice(enemyKey, 1);
            document.getElementById("game").removeChild(enemyObj.element);
        }
    });

    // 星のあたり判定
    game.stars.forEach(function(starObj, starKey) {
        if ( // 機体と星との衝突判定
            starObj.x - starObj.size - 14 <= game.shooter.x &&
            starObj.x + starObj.size + 0 >= game.shooter.x &&
            starObj.y - starObj.size - 20 <= game.shooter.y &&
            starObj.y + starObj.size - 6 >= game.shooter.y
        ) {
            game.shooter.status = 'dead';
            game.shooter.element.innerHTML = '💥';
            game.shooter.element.style.color = 'red';
        }
    });
}

function addScore(addScore) {
    game.score.point += addScore;
    const beforeLevel = game.level;
    game.level = Math.floor(game.score.point / 3000) + 1;
    game.score.element.innerHTML = game.score.point + ':level' + game.level;
    if (beforeLevel < game.level) {
        setInfo('↑ level up ↑', 50);
    }
}

function setInfo(text, clock) {
    game.infoBox.element.innerHTML = text;
    game.infoBox.clock = clock;
    game.infoBox.element.style.display = 'inline';
}

function drawInfoBox() {
    game.infoBox.clock -= 1;

    if (
        game.infoBox.clock === 25 ||
        game.infoBox.clock === 30
    ) {
        game.infoBox.element.style.color = 'rgba(255,0,0,0)';
    } else {
        game.infoBox.element.style.color = 'red';
    }

    if (game.infoBox.clock <= 0) {
        game.infoBox.element.style.display = 'none';
    }
}



function draw() {
    backgroundDraw();
    drawBullet();
    drawEnemy();
    checkConflict();
    drawInfoBox();

    if (game.shooter.status === 'alive') {
        addScore(1); // 生きてるだけで得点
    }

    counter += 1;
    if (counter > 2520) { counter = 1; }
}


setInterval(draw, 50);

window.onload = function() {
    document.getElementById("game").style.width = windowWidth + "px";
    document.getElementById("game").style.height = windowHeight + "px"
    document.body.addEventListener("mousemove", MouseMoveFunc);

    game.shooter.x = Math.floor(windowWidth / 2) - 10;
    game.shooter.y = windowHeight - 100;
    game.shooter.status = 'alive';

    const shooter = document.createElement("span");
    shooter.innerHTML = "✈︎";
    shooter.style.color = 'white';
    shooter.style.fontSize = '200%';
    shooter.style.position = "absolute";
    shooter.style.left = game.shooter.x + 'px';
    shooter.style.top = game.shooter.y + 'px';
    shooter.style.transform = "rotate(-90deg)";
    game.shooter.element = shooter;
    document.getElementById("game").appendChild(shooter);

    const score = document.createElement("span");
    score.innerHTML = game.score.point;
    score.style.color = 'red';
    score.style.position = "absolute";
    score.style.left = '0px';
    score.style.top = '0px';
    game.score.element = score;
    document.getElementById("game").appendChild(score);

    const infoBox = document.createElement("span");
    infoBox.style.color = 'red';
    infoBox.style.backgroundColor = 'rgba(255,255,255,0.1)';
    infoBox.style.fontSize = '120%';
    infoBox.style.textAlign = 'center';
    infoBox.style.width = '200px';
    infoBox.style.height = '30px';
    infoBox.style.position = "absolute";
    infoBox.style.left = '50px';
    infoBox.style.top = '450px';
    game.infoBox.element = infoBox;
    document.getElementById("game").appendChild(infoBox);

    setInfo("Have a nice flight !", 50);
}