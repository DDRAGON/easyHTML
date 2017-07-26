'use strict';

const windowWidth = 300; // 横幅
const windowHeight = 500;
const game = {
    shooter: {},
    counter: 0
};

window.onload = function() {
    document.getElementById("game").style.width = windowWidth + "px";
    document.getElementById("game").style.height = windowHeight + "px"

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
}