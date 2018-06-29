const animationObj = {
    text: '３',
    size: 150,
    drawX: 0,
    drawY: 0
}




function countDown(callback) {

    let tickCounter = 0;
    const animationArea = document.getElementById('animation');

    const aniCan = document.createElement('canvas');
    aniCan.setAttribute('width', window.innerWidth + 'px');
    aniCan.setAttribute('height', window.innerHeight + 'px');
    aniCan.style.position = 'absolute';
    aniCan.style.left = '0px';
    aniCan.style.top = '0px';
    aniCan.style.zIndex = '200';
    aniCan.style.backgroundColor = 'rgba(240, 240, 240, 0.7)';

    animationArea.appendChild(aniCan);
    const ctx = aniCan.getContext("2d");
    
    animationObj.drawX = window.innerWidth/2 - 100 + 20;
    animationObj.drawY = window.innerHeight/2 - 100 + 160;
    const aniInterval = setInterval(function() {
        ctx.fillStyle = "rgb(230, 230, 230)";
        ctx.fillRect(window.innerWidth/2 - 100, window.innerHeight/2 - 100, 200, 200);
        ctx.fillStyle = "rgb(33, 33, 33)";
        ctx.font = animationObj.size + "px 'ＭＳ Ｐゴシック'";
        ctx.fillText(animationObj.text, animationObj.drawX, animationObj.drawY);
        if (tickCounter < 350) {
            animationObj.size -= 1;
            if (tickCounter % 2 === 1) {
                animationObj.drawX += 1;
                animationObj.drawY -= 1;
            }
        }

        tickCounter += 1;
        if (tickCounter === 100) {
            animationObj.size = 150;
            animationObj.drawX = window.innerWidth/2 - 100 + 20;
            animationObj.drawY = window.innerHeight/2 - 100 + 160;
            animationObj.text = '２';
        } else if (tickCounter === 200) {
            animationObj.size = 150;
            animationObj.drawX = window.innerWidth/2 - 100 + 20;
            animationObj.drawY = window.innerHeight/2 - 100 + 160;
            animationObj.text = '１';
        } else if (tickCounter === 300) {
            animationObj.size = 50;
            animationObj.drawX = window.innerWidth/2 - 100 + 20;
            animationObj.drawY = window.innerHeight/2 - 100 + 120;
            animationObj.text = 'START';
        } else if (tickCounter === 350) {
            clearInterval(aniInterval);
            animationArea.removeChild(aniCan);
            return callback();
        }
    }, 15);
}