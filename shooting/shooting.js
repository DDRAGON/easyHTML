
(function() {
var config = {
	cols: 10,
	rows: 15,
	cellWidth: 32,
	cellHeight: 32,
	bulletSpeed: 20,
	reloadCount: 3
};
var status = {};
var imageName = ["shooter1_1", "shooter1_2", "bullet", "bullet2", "bullet3", "bullet4_1", "bullet5", "bullet6", "space", "beginnershooter", "standardshooter", "skilledshooter",  
                 "ebullet2", "ebullet3", "wing", "option", "boss2", "boss2_2", "enemy4", "boss3_1", "1up", "undo1", "undo2", "opening2", 
                 "boss3_2", "boss3_3", "batoption1", "batoption2", "stageselect", "stageselect4", "outframe1", "outframe2", "outframe3", "outframe4", "background"];
var images = {};
var drawBackground = function() {
	var bottom = config.height + config.cellHeight - status.currentTop;
	if(bottom) {
		status.ctx.drawImage(status.bgCtx.canvas, 0, status.currentTop, config.width, bottom, 0, 0, config.width, bottom);
	}
	if(config.height - bottom) {
		status.ctx.drawImage(status.bgCtx.canvas, 0, bottom);
	}
};
var draw = function() {
	drawBackground();
	if(status.state == "gaming" || status.state == "yoin1" || status.state == "yoin2" || status.state == "yoin3" || status.state == "yoin4") {
		status.ctx.drawImage(images["shooter1_" + ((status.frameCount%6<1)? "1": "2")], status.x - (status.cellwidth / 2) | 0, status.y - (status.cellheight / 2) | 0);
	} else if(status.state == "dying") {
		status.ctx.drawImage(images["bomb1_" + status.dying], status.x - (status.cellwidth / 2) | 0, status.y - (status.cellheight / 2) | 0);
		if(++status.dying > 10) {
			status.state = "gameover";
		}
	}
	if(status.state == "yoin1" || status.state == "yoin2" || status.state == "yoin3"){
		if(status.frameCount < 50){
			status.bombs[status.frameCount + "bo1"] = createBomb(Math.random() * config.width, Math.random() * config.height);
			status.bombs[status.frameCount + "bo2"] = createBomb(Math.random() * config.width, Math.random() * config.height/2);
			status.bombs[status.frameCount + "bo3"] = createBomb(Math.random() * config.width, Math.random() * config.height/3);
		}
		if(status.frameCount == 50){
			status.items[status.frameCount + "i"] = createItem(150, 32, 4); status.itemCount++;
		}
		if(status.frameCount > 50){
			if(status.state == "yoin1"){
				status.ctx.fillStyle = "blue"; status.ctx.font = "26px \'Times New Roman\'";
				status.ctx.drawImage(images["items2_" + (status.frameCount%10 +1)], 150, 180);
			}else if(status.state == "yoin2"){
				status.ctx.fillStyle = "lime"; status.ctx.font = "26px \'Times New Roman\'";
				status.ctx.drawImage(images["itemp2_" + (status.frameCount%10 +1)], 150, 160);
			}else if(status.state == "yoin3"){
				status.ctx.fillStyle = "red"; status.ctx.font = "26px \'Times New Roman\'";
				status.ctx.drawImage(images["item02_" + (status.frameCount%10 +1)], 150, 160);
			}
			status.ctx.fillText("Now!", 130, 100); status.ctx.fillText("You can get", 80, 150);
		}
		if(status.frameCount == 200){
			status.state = "stageselect";
		}
	}else if(status.state == "yoin4"){
		if(status.frameCount < 150){
			status.bombs[status.frameCount + "bo1"] = createBomb(Math.random() * config.width, Math.random() * config.height);
			status.bombs[status.frameCount + "bo2"] = createBomb(Math.random() * config.width, Math.random() * config.height/2);
			status.bombs[status.frameCount + "bo3"] = createBomb(Math.random() * config.width, Math.random() * config.height/3);
			status.bombs[status.frameCount + "bo4"] = createBomb(Math.random() * config.width, Math.random() * config.height/3);
		}
		if(status.frameCount < 200 && status.frameCount%20 < 18){
			status.ctx.fillStyle = "skyblue"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText("Game clear!", 90,350 );	
		}
		if(status.frameCount == 200){
			status.state = "ending";
		}
	}else if(status.state == "gameover" && status.life == 0){
		status.ctx.fillStyle = "red"; status.ctx.font = "38px \'Times New Roman\'";
		status.ctx.fillText("GAME OVER", 50, 100);
	}
};
var drawSpace = function(x, y, image) {
	status.bgCtx.drawImage(images[image + Math.floor(Math.random() * 10 + 1)], x * config.cellWidth, y * config.cellHeight);
};
var ending = function(frame){
	status.currentTop--;
	status.currentTop = status.currentTop || (config.height + config.cellHeight);
	if(status.currentTop % config.cellHeight == 0) {
		var image = "stage1_";
		var line = status.currentTop / config.cellHeight - 1;
		for(var x = 0; x < config.cols; x++) {
			drawSpace(x, line, image);
		}
	}
	drawBackground();
	if(frame < 250){
		status.ctx.drawImage(images["shooter1_" + ((Math.random()*6<1)? "1": "2")], status.x - (status.cellwidth / 2) | 0, status.y - (status.cellheight / 2) | 0);
		status.y -= 10;
	}
	if(frame < 700){
		if(frame < 506){
			status.ctx.drawImage(images["space"], 144, (frame-250) - 32);
			if(frame < 406){
				status.ctx.drawImage(images["shooter1_" + ((Math.random()*6<1)? "1": "2")], 88, (frame-250)*2 - 32);
			}else{
				status.ctx.drawImage(images["shooter1_" + ((Math.random()*6<1)? "1": "2")], 88, 280);
			}
		}else{
			status.ctx.drawImage(images["space"], 144, 224);
			if(frame < 547){
				status.ctx.drawImage(images["shooter1_" + ((Math.random()*6<1)? "1": "2")], 88 + (frame-507)*2, 280 - (frame-507), 32 - (frame-507), 32 - (frame-507));
			}
		}
		if(frame >= 280 && frame<288){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("T", 60,120 );	
		}else if(frame >= 288 && frame<296){
			status.ctx.fillStyle ="lime";status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("Th", 60,120 );
		}else if(frame >= 296 && frame<304){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The", 60,120 );
		}else if(frame >= 304 && frame<312){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The g", 60,120 );
		}else if(frame >= 312 && frame<320){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The ga", 60,120 );
		}else if(frame >= 320 && frame<328){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gat", 60,120 );
		}else if(frame >= 328 && frame<336){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate", 60,120 );
		}else if(frame >= 336 && frame<344){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate w", 60,120 );
		}else if(frame >= 344 && frame<352){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate wa", 60,120 );
		}else if(frame >= 352 && frame<360){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was", 60,120 );
		}else if(frame >= 360 && frame<368){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was o", 60,120 );
		}else if(frame >= 368 && frame<376){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was op", 60,120 );
		}else if(frame >= 376 && frame<384){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was ope", 60,120 );
		}else if(frame >= 384 && frame<392){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was open", 60,120 );
		}else if(frame >= 392 && frame<400){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was opene", 60,120 );
		}else if(frame >= 400 && frame<408){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was opened", 60,120 );
		}else if(frame >= 406){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'"; status.ctx.fillText("The gate was opened.", 60,120 );
		}
		if(frame >= 416){ status.ctx.drawImage(images["itemp2_1"], 80, 150); }
		if(frame >= 424){ status.ctx.drawImage(images["items2_1"], 150, 150); }
		if(frame >= 432){ status.ctx.drawImage(images["item02_1"], 220, 150); }
		if(frame >= 440 && frame < 448){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("A", 20,200 );
		}else if(frame >= 448 && frame < 456){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("An", 20,200 );
		}else if(frame >= 456 && frame < 464){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And", 20,200 );
		}else if(frame >= 464 && frame < 472){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And S", 20,200 );
		}else if(frame >= 472 && frame < 480){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And St", 20,200 );
		}else if(frame >= 480 && frame < 488){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Sta", 20,200 );
		}else if(frame >= 488 && frame < 496){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Star", 20,200 );
		}else if(frame >= 496 && frame < 504){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Stari", 20,200 );
		}else if(frame >= 504 && frame < 512){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Staric", 20,200 );
		}else if(frame >= 512 && frame < 520){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick", 20,200 );
		}else if(frame >= 520 && frame < 528){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick f", 20,200 );
		}else if(frame >= 528 && frame < 536){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick fi", 20,200 );
		}else if(frame >= 536 && frame < 544){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick fin", 20,200 );
		}else if(frame >= 544 && frame < 552){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find", 20,200 );
		}else if(frame >= 552 && frame < 560){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find t", 20,200 );
		}else if(frame >= 560 && frame < 568){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find th", 20,200 );
		}else if(frame >= 568 && frame < 576){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the", 20,200 );
		}else if(frame >= 576 && frame < 584){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the o", 20,200 );
		}else if(frame >= 584 && frame < 592){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the ot", 20,200 );
		}else if(frame >= 592 && frame < 600){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the oth", 20,200 );
		}else if(frame >= 600 && frame < 608){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the othe", 20,200 );
		}else if(frame >= 608 && frame < 616){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other", 20,200 );
		}else if(frame >= 616 && frame < 624){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other s", 20,200 );
		}else if(frame >= 624 && frame < 632){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other sp", 20,200 );
		}else if(frame >= 632 && frame < 640){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other spa", 20,200 );
		}else if(frame >= 640 && frame < 648){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other spac", 20,200 );
		}else if(frame >= 648 && frame < 656){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other space", 20,200 );
		}else if(frame >= 656){
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'"; status.ctx.fillText("And Starick find the other space.", 20,200 );
		}
	}else if(frame >= 700 && frame < 820){
			status.ctx.fillStyle = "lime"; status.ctx.font = "24px \'Times New Roman\'";
			status.ctx.fillText("The gate was opened.", 60,120 - (frame - 700)*5);
			status.ctx.drawImage(images["itemp2_1"], 80, 150-(frame - 700)*5);status.ctx.drawImage(images["items2_1"], 150,150-(frame - 700)*5);status.ctx.drawImage(images["item02_1"], 220,150-(frame - 700)*5);
			status.ctx.fillStyle = "lime"; status.ctx.font = "20px \'Times New Roman\'";
			status.ctx.fillText("And Starick find the other space.", 20,200-(frame - 700)*5);
			status.ctx.drawImage(images["space"], 144, 224-(frame - 700)*5);
			status.ctx.fillStyle = "white"; status.ctx.font = "32px \'Times New Roman\'";
			status.ctx.fillText("CAST", 120, 700 - (frame-700)*5);
	}
	if(frame >= 820 && frame < 1820){
		status.ctx.fillStyle = "white"; status.ctx.font = "32px \'Times New Roman\'";
		status.ctx.fillText("CAST", 120, 100);
	}
	if(frame >= 820 && frame < 920){
		status.ctx.drawImage(images["enemy2_1"], 80, 150);status.ctx.drawImage(images["enemy2_2"], 120, 150);status.ctx.drawImage(images["enemy2_3"], 160, 150);status.ctx.drawImage(images["enemy2_4"], 200, 150);
		status.ctx.drawImage(images["enemy2_5"], 80, 190);status.ctx.drawImage(images["enemy2_6"], 120, 190);status.ctx.drawImage(images["enemy2_7"], 160, 190);status.ctx.drawImage(images["enemy2_8"], 200, 190);
		var text = "Babuboid"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 920 && frame < 1020){
		status.ctx.drawImage(images["enemy3_1"], 80, 150);
		if(frame < 950){
			status.ctx.drawImage(images["enemy3_2"], 120, 150);
		}else{
			status.ctx.drawImage(images["wing"], 120, 150); status.ctx.drawImage(images["head2"], 133 + (frame-950)*3, 153 - (frame-950)*3);
		}
		status.ctx.drawImage(images["enemy3_3"], 160, 150);status.ctx.drawImage(images["enemy3_4"], 200, 150);
		status.ctx.drawImage(images["enemy3_5"], 80, 190);status.ctx.drawImage(images["enemy3_6"], 120, 190);status.ctx.drawImage(images["enemy3_7"], 160, 190);status.ctx.drawImage(images["enemy3_8"], 200, 190);
		var text = "Headshooting sprite"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1020 && frame < 1120){
		status.ctx.drawImage(images["stage3_1"], 128, 134); status.ctx.drawImage(images["stage3_2"], 160, 134);
		status.ctx.drawImage(images["stage3_3"], 128, 166); status.ctx.drawImage(images["stage3_6"], 160, 166);
		status.ctx.drawImage(images["enemy5_1_" + ((frame%12 < 6)? "1": "2")], 144, 150);
		var text = "Bloody bat"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1120 && frame < 1220){
		status.ctx.drawImage(images["undo" + ((frame%20 < 18)? "1": "2")], 144, 150);
		var text = "Mr. undo"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1220 && frame < 1320){
		status.ctx.drawImage(images["enemy4"], 128, 150 + ((frame < 1280)? 0: (frame - 1280)*10));
		var text = " Booomber"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1320 && frame < 1420){
		status.ctx.drawImage(images["boss1_" + (frame%4 + 1)], 128, 150);
		var text = "VC "; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1420 && frame < 1520){
		status.ctx.drawImage(images["stage2_2"], 112, 134); status.ctx.drawImage(images["stage2_1"], 144, 134); status.ctx.drawImage(images["stage2_8"], 176, 134);
		status.ctx.drawImage(images["stage2_5"], 112, 166); status.ctx.drawImage(images["stage2_6"], 144, 166); status.ctx.drawImage(images["stage2_7"], 176, 166);
		status.ctx.drawImage(images["stage2_3"], 112, 198); status.ctx.drawImage(images["stage2_4"], 144, 198); status.ctx.drawImage(images["stage2_10"],176, 198);
		if(frame%40 < 30){status.ctx.drawImage(images["boss2"], 128, 150);}
		var text = "Snooker"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1520 && frame < 1620){
		status.ctx.drawImage(images["stage3_1"], 112, 134); status.ctx.drawImage(images["stage3_2"], 144, 134); status.ctx.drawImage(images["stage3_4"], 176, 134);
		status.ctx.drawImage(images["stage3_7"], 112, 166); status.ctx.drawImage(images["stage3_8"], 144, 166); status.ctx.drawImage(images["stage3_9"], 176, 166);
		status.ctx.drawImage(images["stage3_3"], 112, 198); status.ctx.drawImage(images["stage3_5"], 144, 198); status.ctx.drawImage(images["stage3_6"], 176, 198);
		status.ctx.drawImage(images["boss3_" + ((frame%40 < 10)? "2": "1")], 128, 150);
		var text = "Use of darkness"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1620 && frame < 1720){
		status.ctx.drawImage(images["shooter1_" + ((Math.random()*6<1)? "1": "2")], 144, 150);
		var text = " Starick"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1720 && frame < 1820){
		status.ctx.drawImage(images["stage4_1"], 112, 134); status.ctx.drawImage(images["stage4_2"], 144, 134); status.ctx.drawImage(images["stage4_4"], 176, 134);
		status.ctx.drawImage(images["stage4_9"], 112, 166); status.ctx.drawImage(images["stage4_8"], 144, 166); status.ctx.drawImage(images["stage4_9"], 176, 166);
		status.ctx.drawImage(images["stage4_3"], 112, 198); status.ctx.drawImage(images["stage4_10"], 144, 198); status.ctx.drawImage(images["stage4_6"], 176, 198);
		status.ctx.drawImage(images["boss4_" + (((frame - 1720) / 17 + 1) | 0)], 128, 150);
		var text = "Master Babuboid"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250);
	}else if(frame >= 1820){
		if(frame < 2230){
			frame = frame - 1820;
		}else{
			frame = 410;
		}
		var text = "";status.paramElement.innerHTML = "";
		status.ctx.fillStyle = "white"; status.ctx.font = "32px \'Times New Roman\'"; status.ctx.fillText("CAST", 120, 100-frame);
		status.ctx.drawImage(images["stage4_1"], 112, 134-frame); status.ctx.drawImage(images["stage4_2"], 144, 134-frame); status.ctx.drawImage(images["stage4_4"], 176, 134-frame);
		status.ctx.drawImage(images["stage4_9"], 112, 166-frame); status.ctx.drawImage(images["stage4_8"], 144, 166-frame); status.ctx.drawImage(images["stage4_9"], 176, 166-frame);
		status.ctx.drawImage(images["stage4_3"], 112, 198-frame); status.ctx.drawImage(images["stage4_10"], 144, 198-frame); status.ctx.drawImage(images["stage4_6"], 176, 198-frame);
		status.ctx.drawImage(images["boss4_" + ((frame%40 < 38)? "1": "2")], 128, 150-frame);
		text = "Master Babuboid"; status.ctx.fillStyle = "white"; status.ctx.font = "26px \'Times New Roman\'"; status.ctx.fillText(text, config.width/2 - text.length*6, 250-frame);
		status.ctx.fillStyle = "yellow";status.ctx.font = "20px \'Times New Roman\'";
		text = "Shooting Shooter  Version 1.00"; status.ctx.fillText(text, config.width/2 - text.length*4, 480 - frame);
		status.ctx.fillStyle = "white";status.ctx.font = "34px \'Times New Roman\'";
		text = "D_drAAgon"; status.ctx.fillText(text, config.width/2 - text.length*7, 595 - frame);
		status.ctx.font = "24px \'Times New Roman\'";
		text = "Produced by"; status.ctx.fillText(text, config.width/2 - text.length*5, 530 - frame);
		status.ctx.fillStyle = "red";status.ctx.font = "26px \'Times New Roman\'";
		text = "Thanks for playing"; status.ctx.fillText(text, config.width/2 - text.length*6, 680 - frame);
		status.ctx.drawImage(images["shooter1_" + ((Math.random()*6<1)? "1": "2")], 144, 740-frame);
		status.ctx.drawImage(images["enemy2_1"], 184, 740-frame);
		status.ctx.drawImage(images["enemy3_3"], 104, 740-frame);
		status.ctx.drawImage(images["bomb1_" + (frame%10 + 1)], 64, 740-frame);status.ctx.drawImage(images["bomb1_" + (frame%10 + 1)], 224, 740-frame);
	}
};
var createBullet = function(dx, dy, bullet_type, createx, createy, rotate) {
	var bimg = "bullet"; var width = 4; var height = 6; var cellwidth = 4; var cellheight = 4;
	if(rotate == 0 && bullet_type > 1){
		bimg = (bullet_type == 4)? "bullet4_1": "bullet" + bullet_type; width = height = cellwidth = cellheight = bullet_type * 2;
		if(bullet_type ==2 || bullet_type ==3){ height = cellheight = 8; }
	}else if(rotate != 0 && bullet_type > 1){
		bimg = "bullet" + (bullet_type+3); width = height = cellwidth = cellheight = bullet_type*2 +2;
	}
	return {x: createx, y: createy, dx: config.bulletSpeed * dx, dy: config.bulletSpeed * dy, bullet_type: bullet_type, imagename: bimg, rotate: rotate, width: width, height: height, cellwidth: cellwidth, cellheight: cellheight};
};
var createEbullet = function(dx, dy, ebullet_type, ebullet_imagename, createx, createy) {
	if(ebullet_type == 2){
		var width = 8; var height = 8; var cellwidth = 8; var cellheight = 8;
	}else if(ebullet_type == 3){
		var width = 6; var height = 6; var cellwidth = 6; var cellheight = 6;
		dx = Math.cos(Math.atan2(status.y - createy, status.x - createx)) * dx; dy = Math.sin(Math.atan2(status.y - createy, status.x - createx)) * dy;
	}
	return {x: createx, y: createy, dx: dx, dy: dy, ebullet_type: ebullet_type, imagename: ebullet_imagename , width: width, height: height, cellwidth: cellwidth, cellheight: cellheight};
};
var createEnemy = function() {
	var level = (status.frameCount / 500) | 0;
	var x = status.x + Math.random() * 100 - 50;
	var fy = (level >= 8)? ((Math.random() * 2) | 0) * config.height: 0;
	var y = status.y + Math.random() * 100 - 50;
	var fx = Math.random() * config.width;
	var r = Math.atan2(y - fy, x - fx);
	var d = Math.random() * (3.5 + level) + 2;
	d = (d < 8)? d: 8;
	var hasitem_rand = Math.random()*120;
	var hasitem = 0;
	if(hasitem_rand < 3){
		if(status.level == 1){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y == 0 && status.clearlist.z == 0){
			hasitem = 1;
		}else if(status.clearlist.x == 0 && status.clearlist.y > 0 && status.clearlist.z == 0){
			hasitem = 2;
		}else if(status.clearlist.x == 0 && status.clearlist.y == 0 && status.clearlist.z > 0){
			hasitem = 3;
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0 && status.clearlist.z > 0){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0){
			hasitem = (Math.random()*2 < 1)? 1: 2;
		}else if(status.clearlist.x > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 1: 3;
		}else if(status.clearlist.y > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 2: 3;
		}
	}
	if(hasitem > 0){
		var hp = (2 + status.level + level / 4) | 1;
	}else{
		var hp = (Math.random() * Math.random() * ((2 + status.level + level/ 4) | 0)) | 1;
	}
	return {x: fx, y: fy, dx: Math.cos(r) * d, dy: Math.sin(r) * d, hp: hp, score: hp * hp * 100, state: "enemy2_" + ((Math.random() * 3 + 1) | 0), hasitem: hasitem, width: 32, height: 28, cellwidth: 32, cellheight: 32, fireframe: 0, enemytype: 2};
};
var createEnemy_specified = function(x,y,dx,dy) {
	var hasitem_rand = Math.random()*150;
	var hasitem = 0;
	if(hasitem_rand < 3){
		if(status.level == 1){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y == 0 && status.clearlist.z == 0){
			hasitem = 1;
		}else if(status.clearlist.x == 0 && status.clearlist.y > 0 && status.clearlist.z == 0){
			hasitem = 2;
		}else if(status.clearlist.x == 0 && status.clearlist.y == 0 && status.clearlist.z > 0){
			hasitem = 3;
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0 && status.clearlist.z > 0){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0){
			hasitem = (Math.random()*2 < 1)? 1: 2;
		}else if(status.clearlist.x > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 1: 3;
		}else if(status.clearlist.y > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 2: 3;
		}
	}
	var hp = ((Math.random() * (2 + status.level)) | 0) + 1;
	return {x: x, y: y, dx: dx, dy: dy, hp: hp, score: 200, state: "enemy2_" + ((Math.random() * 3 + 1) | 0), hasitem: hasitem, width: 32, height: 28, cellwidth: 32, cellheight: 32, fireframe: 0, enemytype: 2};
};
var createEnemy_angel = function() {
	var x = Math.random() * 5;
	if(x < 1){
		x = 0; var y = Math.random()*config.height;
	}else if(x > 3){
		x = config.width; var y = Math.random()*config.height;
	}else{
		x *= config.width/5; var y = ((Math.random() * 2) | 0) * config.height;
	}
	var r = Math.atan2(status.y - y, status.x - x);
	var d = Math.random()*3 + 1;
	var hasitem_rand = Math.random()*30;
	var hasitem = 0;
	if(hasitem_rand < 3){
		if(status.level == 1){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y == 0 && status.clearlist.z == 0){
			hasitem = 1;
		}else if(status.clearlist.x == 0 && status.clearlist.y > 0 && status.clearlist.z == 0){
			hasitem = 2;
		}else if(status.clearlist.x == 0 && status.clearlist.y == 0 && status.clearlist.z > 0){
			hasitem = 3;
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0 && status.clearlist.z > 0){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0){
			hasitem = (Math.random()*2 < 1)? 1: 2;
		}else if(status.clearlist.x > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 1: 3;
		}else if(status.clearlist.y > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 2: 3;
		}
	}
	var fireframe = status.frameCount + ((Math.random() *200) | 0) + 60 - status.level*10;
	return {x: x, y: y, dx: Math.cos(r) * d, dy: Math.sin(r) * d, hp: status.level, score: 200, state: "enemy3_" + ((Math.random() * 3 + 1) | 0), hasitem: hasitem, width: 26, height: 21, cellwidth: 32, cellheight: 32, fireframe: fireframe, enemytype: 3};
};
var createEnemy_bom = function( createx, createy) {
	return {x: createx, y: createy, dx: 0, dy: 10, hp: (10+status.level*5), score: 300, state: "enemy4", hasitem: 0, width: 20, height: 54, cellwidth: 64, cellheight: 64, fireframe: 0, enemytype: 4};
};
var createEnemy_bat = function( createx, createy) {
	if( createx > 1000 || createy > 1000){
		var x = Math.random() * 5;
		if(x < 1){
			x = 0; var y = Math.random()*64;
		}else if(x > 3){
			x = config.width; var y = Math.random()*64;
		}else{
			x *= config.width/5; var y = 0;
		}
	}else{
		var x = createx; var y = createy;
	}
	var r = Math.atan2(status.y - y, status.x - x);
	var d = Math.random()*5 + 1;
	var hasitem_rand = Math.random()*50;
	var hasitem = 0;
	if(hasitem_rand < 3){
		if(status.level == 1){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y == 0 && status.clearlist.z == 0){
			hasitem = 1;
		}else if(status.clearlist.x == 0 && status.clearlist.y > 0 && status.clearlist.z == 0){
			hasitem = 2;
		}else if(status.clearlist.x == 0 && status.clearlist.y == 0 && status.clearlist.z > 0){
			hasitem = 3;
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0 && status.clearlist.z > 0){
			if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
		}else if(status.clearlist.x > 0 && status.clearlist.y > 0){
			hasitem = (Math.random()*2 < 1)? 1: 2;
		}else if(status.clearlist.x > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 1: 3;
		}else if(status.clearlist.y > 0 && status.clearlist.z > 0){
			hasitem = (Math.random()*2 < 1)? 2: 3;
		}
	}
	var hp = 4 + status.level*4;
	if(hasitem > 0){
		var state = "enemy5_2_1";
	}else{
		var state = "enemy5_1_1";
	}
	return {x: x, y: y, dx: Math.cos(r)*d, dy: Math.sin(r)*d, hp: hp, score: 500, state: state, hasitem: hasitem, width: 32, height: 20, cellwidth: 32, cellheight: 32, fireframe: 0, enemytype: 5, bornframe: status.frameCount};
};
var createItem = function( nowx, nowy, hasitem) {
	var fx = nowx;
	var fy = nowy;
	var x = status.x + Math.random() * 100 - 50;
	var y = status.y + Math.random() * 100 - 50;
	var r = Math.atan2(y - fy, x - fx);
	var d = 3;
	var state = "1up";
	if(hasitem != 4){
		var cellwidth = 21; var cellheight = 21; var width = 21; var height = 21;
	}else{
		var cellwidth = 22; var cellheight = 22; var width = 22; var height = 22;
	}
	if(hasitem == 1){ state = "items2_1"; }else if(hasitem == 2){ state = "itemp2_1"; }else if(hasitem == 3){ state = "item02_1"; }
	return {x: fx, y: fy, dx: Math.cos(r) * d, dy: Math.sin(r) * d, state: state, hasitem: hasitem, width: width, height: height, cellwidth: cellwidth, cellheight: cellheight};
};
var createBoss = function(bosstype) {
	var level = status.clearlist.x + status.clearlist.y + status.clearlist.z;
	if(bosstype == 1){
		var state = "boss1_1"; var dx = 0; var dy = 1; var y = -32; var hp = 10 + status.level*10 + level*40; var width = 37; var height = 43; var score = 2000;
		var cellwidth = 64; var cellheight = 64; var optionstate = ""; var canattack = 1;
	}else if(bosstype == 2){
		var state = "boss2"; var dx = 0; var dy = 0; var y = 32; var hp = status.level*10 + level*20; var width = 64; var height = 64; var score = 2000;
		var cellwidth = 64; var cellheight = 64; var optionstate = ""; var canattack = 1;
	}else if(bosstype == 3){
		var state = "boss3_1"; var dx = 0; var dy = 2; var y = -32; var hp = status.level*10 + level*30; var width = 64; var height = 56; var score = 2000;
		var cellwidth = 64; var cellheight = 64; var optionstate = "batoption1"; var canattack = 1;
	}else if(bosstype == 4){
		var state = "boss4_1"; var dx = 0; var dy = 0; var y = -32; var hp = 100*(status.level+1); var width = 58; var height = 62; var score = 10000;
		var cellwidth = 64; var cellheight = 64; var optionstate = ""; var canattack = 0;
	}
	return {x: (config.width / 2) | 0, y: y, dx: dx, dy: dy, state: state, bosstype: bosstype, hp: hp, width: width, height: height, cellwidth: cellwidth, cellheight: cellheight, score: score, optionstate: optionstate, canattack: canattack};
};
var createBomb = function(createx, createy) {
	return {x: createx, y: createy, state: "bomb1_1", cellwidth: 32, cellheight: 32};
};
var tick = function() {
	setTimeout(tick, 1000 / 30);
	if(status.state == "loading") {
		var count = status.loadingtickcount %20;
		status.ctx.fillStyle = "silver"; status.ctx.font = "26px \'Times New Roman\'";
		status.ctx.fillText("Loading." + ((status.loadingtickcount%8<2)? ".": "") + ((status.loadingtickcount%8<4)? ".": ""), 100, 300);
		status.loadingtickcount++;
		return;
	}else if(status.state == "stageselect"){
		status.ctx.drawImage(images["stageselect"], 0, 0);
		status.ctx.drawImage(images["outframe" + (((status.frameCount/5) | 0)%4 +1)], 140, 118); status.ctx.drawImage(images["outframe" + (((status.frameCount/5) | 0)%4 +1)], 34, 258); status.ctx.drawImage(images["outframe" + (((status.frameCount/5) | 0)%4 +1)], 230, 260);
		if(status.clearlist.x == 0){
			status.ctx.drawImage(images["boss1_" + (status.frameCount%4 +1)], 144, 124);
		}else{
			status.ctx.drawImage(images["boss1_5"], 144, 124);
		}
		if(status.clearlist.z == 0){
			status.ctx.drawImage(images["boss3_" + ((status.frameCount%50 < 10)? "2": "1")], 38, 264);
		}else{
			status.ctx.drawImage(images["boss3_3"], 38, 264);
		}
		if(status.clearlist.y == 0){
			if(status.frameCount%40 < 30){ status.ctx.drawImage(images["boss2"], 242, 270, 48, 48); }
		}else{
			status.ctx.drawImage(images["boss2_2"], 242, 270, 48, 48);
		}
		if(status.clearlist.x>0 && status.clearlist.y>0 && status.clearlist.z>0){
			status.ctx.drawImage(images["stageselect4"], 137, 223);
		}
		status.ctx.fillStyle = "yellow"; status.ctx.font = "28px \'Times New Roman\'";
		if(status.level == 1){
			status.ctx.fillText("Beginner shooter", 60,372 );
		}else if(status.level == 2){
			status.ctx.fillText("Standard shooter", 60,372 );
		}else if(status.level == 3){
			status.ctx.fillText("Skilled shooter", 65,372 );
		}
		status.frameCount++;
		return;
	}else if(status.state == "levelselect"){
		status.ctx.drawImage(images["background"], 0, 0);
		status.ctx.fillStyle = "yellow"; status.ctx.font = "32px \'Times New Roman\'"; status.ctx.fillText("Shooting Style", 60,50 );
		status.ctx.drawImage(images["beginnershooter"], 60, 84);status.ctx.drawImage(images["standardshooter"], 60, 184);status.ctx.drawImage(images["skilledshooter"], 60, 284);
		status.frameCount++;
		return;
	}else if(status.state == "opening"){
		status.ctx.fillStyle = "white"; status.ctx.fillRect(0,0,320,480);
		if(status.frameCount > 100){
			status.ctx.globalAlpha = 1.0;
		}else{
			status.ctx.globalAlpha = ((status.frameCount/20)%6 +5)*0.1;
		}
		status.ctx.drawImage(images["opening2"], 0, 0);
		status.ctx.globalAlpha = 1.0;
		if((status.frameCount/5)%10 < 9){
			status.ctx.fillStyle = "silver"; status.ctx.font = "26px \'Times New Roman\'";
			status.ctx.fillText("touch! to start." + ((status.frameCount%8<2)? ".": "") + ((status.loadingtickcount%8<4)? ".": ""), 80, 300);
		}
		status.frameCount++;
		return;
	}else if(status.state == "ending"){
		ending(status.frameCount++);
		if(status.frameCount >= 2600){ status.frameCount = 2601; status.life = 0; }
		return;
	}
	status.frameCount++;
	status.currentTop--;
	status.currentTop = status.currentTop || (config.height + config.cellHeight);
	if(status.currentTop % config.cellHeight == 0) {
		var image = "stage1_";
		if(typeof status.stage == 'undefined'){
			image = "stage1_";
		}else if(status.stage %4 == 1){
			image = "stage1_";
		}else if(status.stage %4 == 2){
			image = "stage2_";
		}else if(status.stage %4 == 3){
			image = "stage3_";
		}else if(status.stage %4 == 0){
			image = "stage4_";
		}
		var line = status.currentTop / config.cellHeight - 1;
		for(var x = 0; x < config.cols; x++) {
			drawSpace(x, line, image);
		}
	}
	draw();
	if(status.state == "gaming" && status.frameCount % config.reloadCount == 0) {
		status.bullets[status.frameCount + "b"] = createBullet(0, -1, status.shootingpower, status.x, status.y, 0);
		if(status.shootingspread >= 2){
			status.bullets[status.frameCount + "a"] = createBullet(-1, -1, status.shootingpower, status.x, status.y, 45);
			status.bullets[status.frameCount + "c"] = createBullet(1, -1, status.shootingpower, status.x, status.y, -45);
		}
		if(status.shootingspread >= 3){
			status.bullets[status.frameCount + "d"] = createBullet(-1, 1, status.shootingpower, status.x, status.y, -45);
			status.bullets[status.frameCount + "e"] = createBullet(1, 1, status.shootingpower, status.x, status.y, 45);
		}
		if(status.shootingspread >= 4){
			status.bullets[status.frameCount + "f"] = createBullet(-1, 0, status.shootingpower, status.x, status.y, 90);
			status.bullets[status.frameCount + "g"] = createBullet(1, 0, status.shootingpower, status.x, status.y, 90);
			status.bullets[status.frameCount + "h"] = createBullet(0, 1, status.shootingpower, status.x, status.y, 0);
		}
		if(status.shootingoption >= 2){
			var makex = status.x+30;
			status.bullets[status.frameCount + "b2"] = createBullet(0, -1, status.shootingpower, makex, status.y, 0);
			if(status.shootingspread >= 2){
				status.bullets[status.frameCount + "a2"] = createBullet(-1, -1, status.shootingpower, makex, status.y, 45);
				status.bullets[status.frameCount + "c2"] = createBullet(1, -1, status.shootingpower, makex, status.y, -45);
			}
			if(status.shootingspread >= 3){
				status.bullets[status.frameCount + "d2"] = createBullet(-1, 1, status.shootingpower, makex, status.y, -45);
				status.bullets[status.frameCount + "e2"] = createBullet(1, 1, status.shootingpower, makex, status.y, 45);
			}
		}
		if(status.shootingoption >= 3){
			var makex = status.x-30;
			status.bullets[status.frameCount + "b3"] = createBullet(0, -1, status.shootingpower, makex, status.y, 0);
			if(status.shootingspread >= 2){
				status.bullets[status.frameCount + "a3"] = createBullet(-1, -1, status.shootingpower, makex, status.y, 45);
				status.bullets[status.frameCount + "c3"] = createBullet(1, -1, status.shootingpower, makex, status.y, -45);
			}
		}
		if(status.shootingoption >= 4){
			status.bullets[status.frameCount + "b4"] = createBullet(0, -1, status.shootingpower, status.x+60, status.y, 0);
			status.bullets[status.frameCount + "b5"] = createBullet(0, -1, status.shootingpower, status.x-60, status.y, 0);
		}
	}
	if( status.state == "gaming" && (status.enemyCount < 2 + status.level + status.frameCount / 1000) && status.frameCount>70 ) {
		if(status.stage % 4== 1){
			status.enemys[status.frameCount + "e"] = createEnemy(); status.enemyCount++;
		}else if(status.stage % 4 == 2){
			if(status.enemyCount < (1+status.level)){
				status.enemys[status.frameCount + "e"] = createEnemy_angel(); status.enemyCount++;
			}
		}else if(status.stage % 4 == 3){
			status.enemys[status.frameCount + "e"] = createEnemy_bat( 2000, 2000); status.enemyCount++;
		}
	}
	if(status.state == "gaming"){
		if(status.stage % 4 == 1 && status.frameCount == 1000){
			status.bosses[status.frameCount + "b1" + status.stage] = createBoss(1);
		}else if(status.stage % 4 == 2 && status.frameCount == 1000){
			status.bosses[status.frameCount + "b2" + status.stage] = createBoss(2);
		}else if(status.stage % 4 == 3 && status.frameCount == 1000){
			status.bosses[status.frameCount + "b3" + status.stage] = createBoss(3);
		}else if(status.stage % 4 == 0 && status.frameCount == 100){
			status.bosses[status.frameCount + "b4" + status.stage] = createBoss(4);
		}
	}
	for(var key in status.bullets) {
		var bullet = status.bullets[key];
		bullet.x += bullet.dx;
		bullet.y += bullet.dy;
		if(bullet.x < 0 || bullet.x > config.width || bullet.y < 0 || bullet.y > config.height) {
			delete status.bullets[key];
		} else {
			status.ctx.drawImage(images[bullet.imagename], bullet.x - ((bullet.cellwidth / 2) | 0), bullet.y - ((bullet.cellheight / 2) | 0));
			for(var ekey in status.enemys) {
				var enemy = status.enemys[ekey];
				if(Math.abs(bullet.x - enemy.x) < (enemy.width + bullet.width + 2) / 2 && Math.abs(bullet.y - enemy.y) < (enemy.height + bullet.height + 2) / 2 ) {
					if(enemy.hp) {
						if(status.shootingpower < 4){ enemy.hp -= status.shootingpower; }else{ enemy.hp -= 5; }
						delete status.bullets[key];
						if(enemy.hp <= 0) {
							status.score += enemy.score;
							status.score = (status.score > 999999999)? 999999999: status.score;
							status.scoreElement.innerHTML = "000000000".substring(0, 9 - (status.score + "").length) + status.score;
							if(enemy.hasitem > 0){
								status.items[status.frameCount + "i" + enemy.hasitem] = createItem(enemy.x, enemy.y, enemy.hasitem); status.itemCount++;
							}
							enemy.dx = enemy.dy = 0; enemy.hp = 0;
							enemy.state = "bomb1_1";
						} else {
							var len = enemy.state.length;
							len = (enemy.state.substring(len-1, len) == "w")? len -1: len;
							enemy.state = (enemy.state + "w").substring(0, len+1);
						}
					}
				}
			}
			for(var bkey in status.bosses) {
				var boss = status.bosses[bkey];
				if( ( (boss.bosstype != 2 && boss.canattack) || (boss.bosstype == 2 && (status.frameCount % 50) < 10)) && Math.abs(bullet.x - boss.x) < (boss.width + bullet.width + 2) / 2 && Math.abs(bullet.y - boss.y) < (boss.height + bullet.height + 2) / 2) {
					if(boss.hp) {
						if(status.shootingpower < 4){ boss.hp -= status.shootingpower; }else{ boss.hp -= 5; }
						delete status.bullets[key];
						if(boss.hp <= 0) {
							status.score += boss.score;
							for(var ekey in status.enemys) {
								var enemy = status.enemys[ekey];
								enemy.dx = enemy.dy = 0; enemy.hp = 0;
								enemy.state = "bomb1_1";
								status.score += enemy.score;
								if(enemy.hasitem > 0){
									status.items[status.frameCount + "i" + enemy.hasitem] = createItem(enemy.x, enemy.y, enemy.hasitem);
									status.itemCount++;
								}
							}
							status.score = (status.score > 999999999)? 999999999: status.score;
							status.scoreElement.innerHTML = "000000000".substring(0, 9 - (status.score + "").length) + status.score;
							status.bombs[status.frameCount + "bb"] = createBomb(boss.x, boss.y);
							if(boss.bosstype == 1){
								status.clearlist.x = 1; status.state = "yoin1";
							}else if(boss.bosstype == 2){
								status.clearlist.y = 1; status.state = "yoin2";
							}else if(boss.bosstype == 3){
								status.clearlist.z = 1; status.state = "yoin3";
							}else if(boss.bosstype == 4){
								status.clearlist.w = 1; status.state = "yoin4";
							}
							delete status.bosses[bkey];
							status.frameCount = 0;
						} else {
							var len = boss.state.length;
							len = (boss.state.substring(len-1, len) == "w")? len -1: len;
							boss.state = (boss.state + "w").substring(0, len+1);
						}
					}
				}
			}
		}
	}
	for(var key in status.bosses){
		var boss = status.bosses[key];
		boss.x += boss.dx; boss.y += boss.dy;
		if(boss.bosstype == 1){
			var bossstatepoint = +boss.state.substring(6,7);
			status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
			if(status.frameCount >= 1060 && status.frameCount < 1062){
				boss.dy = 0; boss.dx = -2;
			}
			if(boss.x < 120 || boss.x > config.width - 120){ boss.dx *= -1;}
			boss.state = boss.state.substring(0,6) + (bossstatepoint%4 + 1);
			if(bossstatepoint == 3){
				status.ebullets[status.frameCount + "eb1"] = createEbullet(0, 8, 2, "ebullet2", boss.x-15, boss.y+28);
				status.ebullets[status.frameCount + "eb2"] = createEbullet(0, 8, 2, "ebullet2", boss.x+15, boss.y+28);
				var ram = Math.random() * 12;
				if(ram<5){
					if(ram<1){var x = -6; var y = 0}else if(ram<2){var x = -5; var y = 3;}else if(ram<3){var x = -3; var y = 5;}else if(ram<4){var x = 3; var y = 5;}else{var x = 0; var y = 8;}
					status.enemys[status.frameCount + "e7"] = createEnemy_specified(boss.x-15,boss.y+28, x, y); status.enemyCount++;
				}
				ram = Math.random() * 12;
				if(ram<5){
					if(ram<1){var x = 6; var y = 0}else if(ram<2){var x = 5; var y = 3;}else if(ram<3){var x = 3; var y = 5;}else if(ram<4){var x = -3; var y = 5;}else{var x = 0; var y = 8;}
					status.enemys[status.frameCount + "e8"] = createEnemy_specified(boss.x+15,boss.y+28, x, y); status.enemyCount++;
				}
			}
			if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height-2) /2) {
				status.state = "dying"; status.dying = 1; status.shootingoption = 1;
			}
		}else if(boss.bosstype == 2){
			if(status.frameCount % 50 < 10){
				if(status.frameCount % 50 == 0){
					boss.x = Math.random() * (config.width - boss.width*2) + boss.width; boss.y = Math.random() * 100;
					status.enemys[status.frameCount + "e4"] = createEnemy_bom(boss.x,boss.y); status.enemyCount++;
				}
				status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
				boss.state = boss.state.substring(0,5);
				if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height -2) /2) {
					status.state = "dying"; status.dying = 1; status.shootingoption = 1;
				}
			}
		}else if(boss.bosstype == 3){
			status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
			status.ctx.drawImage(images[boss.optionstate], boss.x + 48, boss.y - 16);
			status.ctx.drawImage(images[boss.optionstate], boss.x - 80, boss.y - 16);
			status.ctx.drawImage(images[boss.optionstate], boss.x +96, boss.y - 16);
			status.ctx.drawImage(images[boss.optionstate], boss.x -128, boss.y - 16);
			if(status.frameCount % 50 == 0){
				boss.state = "boss3_2"; boss.optionstate = "batoption2";
			}else if(status.frameCount % 50 == 10){
				boss.state = "boss3_1"; boss.optionstate = "batoption1";
				status.enemys[status.frameCount + "e1"] = createEnemy_bat( boss.x+8, boss.y + 16);
				status.enemys[status.frameCount + "e2"] = createEnemy_bat( boss.x-8, boss.y + 16);
				status.enemys[status.frameCount + "e3"] = createEnemy_bat( boss.x + 64, boss.y +16);
				status.enemys[status.frameCount + "e4"] = createEnemy_bat( boss.x - 64, boss.y +16);
				status.enemys[status.frameCount + "e5"] = createEnemy_bat( boss.x +112, boss.y +16);
				status.enemys[status.frameCount + "e6"] = createEnemy_bat( boss.x -112, boss.y +16);
				status.enemyCount += 6;
			}else{
				boss.state = boss.state.substring(0,7);
			}
			if(boss.dy != 0 && boss.y > 48){ boss.dy = 0; }
			if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height -2) /2) {
				status.state = "dying"; status.dying = 1; status.shootingoption = 1;
			}
		}else if(boss.bosstype == 4){
			if( status.frameCount <= 330 ){
				if(status.frameCount == 100 || status.frameCount == 110 || status.frameCount == 120 || status.frameCount == 130 || status.frameCount == 140 || 
						status.frameCount == 150 || status.frameCount == 160 || status.frameCount == 170 || status.frameCount == 180 || status.frameCount == 190 || 
						status.frameCount == 200 || status.frameCount == 210 || status.frameCount == 220 || status.frameCount == 230 || status.frameCount == 240){
					boss.y += 6; boss.state = "boss4_5"; boss.canattack = 1;
					status.enemys[status.frameCount + "e1"] = createEnemy_bat( boss.x+8, boss.y + 40);
					status.enemys[status.frameCount + "e2"] = createEnemy_bat( boss.x-8, boss.y + 40);
					status.enemys[status.frameCount + "e3"] = createEnemy_bat( boss.x + 24, boss.y +40);
					status.enemys[status.frameCount + "e4"] = createEnemy_bat( boss.x - 24, boss.y +40);
					status.enemyCount += 4;
				}else if(status.frameCount == 108 || status.frameCount == 118 || status.frameCount == 128 || status.frameCount == 138 || status.frameCount == 148 || 
						status.frameCount == 158 || status.frameCount == 168 || status.frameCount == 178 || status.frameCount == 188 || status.frameCount == 198 || 
						status.frameCount == 208 || status.frameCount == 218 || status.frameCount == 228 || status.frameCount == 238 || status.frameCount == 248 || 
						status.frameCount == 266 || status.frameCount == 274 || status.frameCount == 292 || status.frameCount == 300){
					boss.state = "boss4_1"; boss.canattack = 0;
				}else if(status.frameCount == 263 || status.frameCount == 271 || status.frameCount == 289 || status.frameCount == 297){
					boss.state = "boss4_2"; boss.canattack = 0;
				}
				status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
				boss.state = boss.state.substring(0,7);
				if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height-2) /2) {
					status.state = "dying"; status.dying = 1; status.shootingoption = 1;
				}
			}else if( status.frameCount <= 590 ){
				if(status.enemyCount < (2+status.level)){
					status.enemys[status.frameCount + "e"] = createEnemy_angel(); status.enemyCount++;
				}
				if(status.frameCount == 380 || status.frameCount == 430 || status.frameCount == 480 || status.frameCount == 530 || status.frameCount == 580){
					boss.state = "boss4_6"; boss.canattack = 1;
					boss.x = Math.random() * (config.width - boss.width*2) + boss.width; boss.y = Math.random() * 100;
					status.enemys[status.frameCount + "e4"] = createEnemy_bom(boss.x,boss.y); status.enemyCount++;
				}else if(status.frameCount == 391 || status.frameCount == 441 || status.frameCount == 491 || status.frameCount == 541 || status.frameCount == 591){
					boss.canattack = 0;
				}
				if( (status.frameCount >= 380 && status.frameCount <= 390) || (status.frameCount >= 430 && status.frameCount <= 440) || (status.frameCount >= 480 && status.frameCount <= 490) ||
						(status.frameCount >= 530 && status.frameCount <= 540) || (status.frameCount >= 580 && status.frameCount <= 590) ){
					status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
					boss.state = boss.state.substring(0,7);
					if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height-2) /2) {
						status.state = "dying"; status.dying = 1; status.shootingoption = 1;
					}
				}
			}else if(status.frameCount < 900){
				if(status.frameCount == 640){
					boss.state = "boss4_1"; boss.canattack = 0; boss.x = 164; boss.y = 32;
				}else if(status.frameCount == 658 || status.frameCount == 666 || status.frameCount == 689 || status.frameCount == 697){
					boss.state = "boss4_1";
				}else if(status.frameCount == 655 || status.frameCount == 663 || status.frameCount == 686 || status.frameCount == 694){
					boss.state = "boss4_2";
				}else if(status.frameCount == 717){
					boss.state = "boss4_3"; boss.canattack = 1; boss.dx = 2;
				}else if(status.frameCount == 742 || status.frameCount == 792){
					boss.dx *= -1;
				}
				if(status.frameCount == 717 || status.frameCount == 722 || status.frameCount == 727 || status.frameCount == 732 || status.frameCount == 737 || 
						status.frameCount == 742 || status.frameCount == 747 || status.frameCount == 752 || status.frameCount == 757 || status.frameCount == 762 || 
						status.frameCount == 767 || status.frameCount == 772 || status.frameCount == 777 || status.frameCount == 782 || status.frameCount == 787 || 
						status.frameCount == 792 || status.frameCount == 797 || status.frameCount == 802 || status.frameCount == 807 || status.frameCount == 812 || 
						status.frameCount == 817 || status.frameCount == 822 || status.frameCount == 827 || status.frameCount == 832 || status.frameCount == 837 || 
						status.frameCount == 842 || status.frameCount == 847 || status.frameCount == 852 || status.frameCount == 857 || status.frameCount == 862 || 
						status.frameCount == 867 || status.frameCount == 872 || status.frameCount == 877){
					status.enemys[status.frameCount + "e5"] = createEnemy_specified(boss.x-32,boss.y, -6,0); status.enemys[status.frameCount + "e6"] = createEnemy_specified(boss.x+32,boss.y, 6,0);
					status.enemys[status.frameCount + "e7"] = createEnemy_specified(boss.x-22,boss.y+10, -5,3); status.enemys[status.frameCount + "e8"] = createEnemy_specified(boss.x+22,boss.y+10, 5,3);
					status.enemys[status.frameCount + "e9"] = createEnemy_specified(boss.x-11,boss.y+21, -3,5); status.enemys[status.frameCount + "e10"] = createEnemy_specified(boss.x+11,boss.y+21, 3,5);
					status.enemys[status.frameCount + "e11"] = createEnemy_specified(boss.x+12,boss.y+32, 0,6); status.enemys[status.frameCount + "e12"] = createEnemy_specified(boss.x-12,boss.y+32, 0,6);
				}
				if(status.frameCount >= 640){
					status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
					boss.state = boss.state.substring(0,7);
					if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height-2) /2) {
						status.state = "dying"; status.dying = 1; status.shootingoption = 1;
					}
				}
			}else{
				if(status.frameCount == 920){
					boss.x = Math.random() * (config.width - boss.width*2) + boss.width; boss.y = -32;
					boss.dx = (boss.x > config.width/2)? -2 : 2; boss.dy = 15;
					boss.state = "boss4_4"; boss.canattack = 1;
				}else if(status.frameCount == 970){
					boss.x = Math.random() * (config.width - boss.width*2) + boss.width; boss.y = 512;
					boss.dx = (boss.x > config.width/2)? -2 : 2; boss.dy = -12;
					boss.state = "boss4_4"; boss.canattack = 1;
				}else if(status.frameCount == 967 || status.frameCount == 1017){
					boss.canattack = 0;
				}else if(status.frameCount > 1020){
					status.frameCount = 109; status.enemyCount = 0; boss.dx = boss.dy = 0; boss.x = config.width/2; boss.y = -32;
				}
				if(status.frameCount <= 966 || (status.frameCount>=970 && status.frameCount<=1016)){
					status.ctx.drawImage(images[boss.state], boss.x - ((boss.cellwidth / 2) | 0), boss.y - ((boss.cellheight / 2) | 0));
					boss.state = boss.state.substring(0,7);
					if(status.state == "gaming" && Math.abs(status.x - boss.x) < (status.width + boss.width -2) /2 && Math.abs(status.y - boss.y) < (status.height + boss.height-2) /2) {
						status.state = "dying"; status.dying = 1; status.shootingoption = 1;
					}
				}
			}
		}
	}
	for(var key in status.enemys) {
		var enemy = status.enemys[key];
		enemy.x += enemy.dx;
		enemy.y += enemy.dy;
		if(enemy.x < 0 || enemy.x > config.width || enemy.y < 0 || enemy.y > config.height) {
			delete status.enemys[key]; status.enemyCount--;
		} else {
			status.ctx.drawImage(images[enemy.state], enemy.x - ((enemy.cellwidth / 2) | 0), enemy.y - ((enemy.cellheight / 2) | 0));
			if(enemy.hp == 0) {
				var next = (+enemy.state.substring(6, 8)) + 1;
				if(next > 10) {
					delete status.enemys[key]; status.enemyCount--;
				} else {
					enemy.state = "bomb1_" + next;
				}
			} else {
				var len = enemy.state.length; len = (enemy.state.substring(len-1, len) == "w")? len - 1: len;
				if(enemy.enemytype == 2 || enemy.enemytype == 4){
					if(enemy.hasitem > 0){
						enemy.state = enemy.state.substring(0,len-1) + ((+enemy.state.substring(len-1,len))%7 + 1)
					}else{
						enemy.state = enemy.state.substring(0, len);
					}
				}else if(enemy.enemytype == 3){
					if(enemy.hasitem > 0 && enemy.state != "wing" && enemy.state != "wingw"){
						enemy.state = enemy.state.substring(0,len-1) + ((+enemy.state.substring(len-1,len))%7 + 1)
					}else{
						enemy.state = enemy.state.substring(0, len);
					}
					if(enemy.fireframe == status.frameCount){
						status.ebullets[status.frameCount + "eb"] = createEbullet(3, 3, 3, "head" + enemy.state.substring(7,8), enemy.x, enemy.y-10);
						enemy.state = "wing";
					}
				}else if(enemy.enemytype == 5){
					var batcolor = enemy.state.substring(7,8); var bat_situation = enemy.state.substring(9,10);
					bat_situation = ((status.frameCount - enemy.bornframe)%10 < 5)? 1: 2;
					if(enemy.hasitem > 0){
						batcolor = ((+batcolor) == 8)? 2: (+batcolor) +1;
						enemy.state = "enemy5_" + batcolor + "_" + bat_situation;
					}else{
						enemy.state = "enemy5_1_" + bat_situation;
					}
				}
				if(status.state == "gaming" && Math.abs(status.x - enemy.x) < (status.width + enemy.width -2) / 2 && Math.abs(status.y - enemy.y) < (status.height + enemy.height -2) / 2) {
					status.state = "dying"; status.dying = 1; status.shootingoption = 1;
				}
			}
		}
	}
	for(var key in status.ebullets){
		var ebullet = status.ebullets[key];
		ebullet.x += ebullet.dx;
		ebullet.y += ebullet.dy;
		if(ebullet.x < 0 || ebullet.x > config.width || ebullet.y < 0 || ebullet.y > config.height) {
			delete status.ebullets[key];
		} else {
			status.ctx.drawImage(images[ebullet.imagename], ebullet.x - ((ebullet.cellwidth / 2) | 0), ebullet.y - ((ebullet.cellheight / 2) | 0));
			if(status.state == "gaming" && Math.abs(status.x - ebullet.x) < (status.width + ebullet.width -2) / 2 && Math.abs(status.y - ebullet.y) < (status.height + ebullet.height -2)  / 2) {
				status.state = "dying"; status.dying = 1; status.shootingoption = 1;
			}
		}
	}
	for(var key in status.items){
		var item = status.items[key];
		item.x += item.dx;
		item.y += item.dy;
		if(item.x < 0 || item.x > config.width || item.y < 0 || item.y > config.height) {
			delete status.items[key];
			status.itemCount--;
		} else {
			if(item.hasitem < 4){
				var itemstatepoint = +item.state.substring(7);
				status.ctx.drawImage(images[(itemstatepoint < 11)? item.state.substring(0,7) + "1": item.state.substring(0,7) + (itemstatepoint-10)], item.x - ((item.cellwidth / 2) | 0), item.y - ((item.cellheight / 2) | 0));
				item.state = item.state.substring(0,7) + ((+item.state.substring(7))%20 + 1);
				if( (status.state == "gaming" || status.state == "yoin1" || status.state == "yoin2" || status.state == "yoin3" || status.state == "yoin4")
					&& Math.abs(status.x - item.x) < (status.width + item.width) / 2 && Math.abs(status.y - item.y) < (status.height + item.height) / 2) {
					status.gotitems['x'] = status.gotitems['y']; status.gotitems['y'] = status.gotitems['z']; status.gotitems['z'] = item.hasitem;
					status.shootingpower = 1; status.shootingspread = 1; status.shootingoption = 1; var gotitemstring = "";
					for(gkey in status.gotitems){
						if(status.gotitems[gkey] == 1){
							status.shootingspread += 1; gotitemstring += "<b><font color=\"#0000ff\" style=\"background-color:#000000\">S</font>";
						}else if(status.gotitems[gkey] == 2){
							status.shootingpower += 1; gotitemstring += "<b><font color=\"#00ff00\" style=\"background-color:#000000\">P</font>";
						}else if(status.gotitems[gkey] == 3){
							status.shootingoption += 1; gotitemstring += "<b><font color=\"#ff00ff\" style=\"background-color:#000000\">O</font>";
						}
					}
					status.paramElement.innerHTML = "<br><br>" + gotitemstring;
					status.score += 500;
					delete status.items[key];
					status.itemCount--;
					status.score = (status.score > 999999999)? 999999999: status.score;
					status.scoreElement.innerHTML = "000000000".substring(0, 9 - (status.score + "").length) + status.score;
				}
			}else if(item.hasitem == 4){
				status.ctx.drawImage(images[item.state], item.x - ((item.cellwidth / 2) | 0), item.y - ((item.cellheight / 2) | 0));
				if( (status.state == "gaming" || status.state == "yoin1" || status.state == "yoin2" || status.state == "yoin3" || status.state == "yoin4")
						&& Math.abs(status.x - item.x) < (status.width + item.width) / 2 && Math.abs(status.y - item.y) < (status.height + item.height) / 2) {
					status.life++; status.lifeElement.innerHTML = "<br><img src=\"img/option.png\"><font color=\"#ff00ff\">X" +status.life+ "</font>";
					delete status.items[key]; status.itemCount--;
				}
			}
			
		}
	}
	if(status.shootingoption >= 2){
		status.ctx.drawImage(images["option"], status.x + 38 - ((config.cellWidth / 2) | 0), status.y + 8 - ((config.cellHeight / 2) | 0));
	}
	if(status.shootingoption >= 3){
		status.ctx.drawImage(images["option"], status.x - 22 - ((config.cellWidth / 2) | 0), status.y + 8 - ((config.cellHeight / 2) | 0));
	}
	if(status.shootingoption >= 4){
		status.ctx.drawImage(images["option"], status.x - 52 - ((config.cellWidth / 2) | 0), status.y + 8 - ((config.cellHeight / 2) | 0));
		status.ctx.drawImage(images["option"], status.x + 68 - ((config.cellWidth / 2) | 0), status.y + 8 - ((config.cellHeight / 2) | 0));
	}
	for(var key in status.bombs){
		var bomb = status.bombs[key];
		status.ctx.drawImage(images[bomb.state], bomb.x - ((bomb.cellwidth / 2) | 0), bomb.y - ((bomb.cellheight / 2) | 0));
		var next = (+bomb.state.substring(6, 8)) + 1;
		if(next > 10) {
			delete status.bombs[key];
		} else {
			bomb.state = "bomb1_" + next;
		}
	}
};

var initialize = function( stage ) {
	if(typeof status.stage == 'undefined' || status.stage == 0){
		
	}else{
		if(status.stage %4 == 1){
			var image = "stage1_";
		}else if(status.stage %4 == 2){
			var image = "stage2_";
		}else if(status.stage %4 == 3){
			var image = "stage3_";
		}else if(status.stage %4 == 0){
			var image = "stage4_";
		}
		for(var x = 0; x < config.cols; x++) {
			for(var y = 0; y < config.rows + 1; y++) {
				drawSpace(x, y, image);
			}
		}
	}
	status.frameCount = 0;
	if(stage == 0 && status.state == "levelselect"){
		status.state = "stageselect";
		for(var num = 2; num < 4; num++){
			for(var i = 0; i < 8; i++) {
				var canvas = document.createElement("canvas");
				canvas.width = config.cellWidth;
				canvas.height = config.cellHeight;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(images["enemy"+ num +"_" + (i + 1)], 0, 0);
				ctx.globalCompositeOperation = "source-in";
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				images["enemy"+ num +"_" + (i + 1) + "w"] = canvas;
			}
		}
		for(var num = 1; num < 3; num++){
			for(var i = 0; i < 8; i++) {
				var canvas = document.createElement("canvas");
				canvas.width = config.cellWidth;
				canvas.height = config.cellHeight;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(images["enemy5_"+ (i + 1) +"_" + num], 0, 0);
				ctx.globalCompositeOperation = "source-in";
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				images["enemy5_"+ (i + 1) +"_" + num + "w"] = canvas;
			}
		}
		var array = new Array("wing", "boss2", "enemy4", "boss1_1", "boss1_2", "boss1_3", "boss1_4", "boss3_1", "boss3_2", 
								"boss4_1", "boss4_2", "boss4_3", "boss4_4", "boss4_5", "boss4_6");
		for( item in array ){
			var canvas = document.createElement("canvas");
			canvas.width = config.cellWidth*2;
			canvas.height = config.cellHeight*2;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(images[array[item]], 0, 0);
			ctx.globalCompositeOperation = "source-in";
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			images[array[item] + "w"] = canvas;
		}
		status.currentTop = config.height + config.cellHeight;
		status.x = (config.width / 2) | 0; status.y = (config.height * 3 / 4) | 0;
		status.cellwidth = 32; status.cellheight = 32; status.width = 28 - 4; status.height = 30 - 4;
		status.itemCount = 0; status.score = 0; status.enemyCount = 0; status.stage = 0;
		status.shootingpower = 1; status.shootingspread = 1; status.shootingoption = 1; status.life = 2;
		status.bullets = {}; status.items = {}; status.enemys = {}; status.bombs = {};
		status.gotitems = { x: 0, y: 0, z: 0 }; status.clearlist = { x: 0, y: 0, z: 0, w:0 };
		status.scoreElement.innerHTML = "000000000";
		status.lifeElement.innerHTML = "<br><img src=\"img/option.png\"><font color=\"#ff00ff\">X" +status.life+ "</font>";
		status.paramElement.innerHTML = "<br><br>";
		setTimeout(function() { window.scrollTo(0, 0); }, 250);
	}else if(stage > 0){
		status.state = "gaming";
	}else if(stage == 0){
		status.state = "stageselect";
	}
	status.bosses = {}; status.ebullets = {};
};

window.onload = function() {
	config.width = config.cols * config.cellWidth;
	config.height = config.rows * config.cellHeight;
	status.state = "loading";
	var canvas = document.getElementById("canvas");
	canvas.width = config.width;
	canvas.height = config.height;
	status.ctx = canvas.getContext("2d");
	status.loadingtickcount = 0; status.frameCount = 0;
	tick();
	status.scoreElement = document.getElementsByTagName("div")[0];
	status.scoreElement.style.width = config.width + "px";
	status.lifeElement = document.getElementsByTagName("div")[1];
	status.lifeElement.style.width = config.width + "px";
	status.paramElement = document.getElementsByTagName("div")[2];
	status.paramElement.style.width = config.width + "px";
	var bgCanvas = document.createElement("canvas");
	bgCanvas.width = config.width;
	bgCanvas.height = config.height + config.cellHeight;
	status.bgCtx = bgCanvas.getContext("2d");
	for(var i = 0; i < 10; i++) {
		imageName.push("stage1_" + (i + 1)); imageName.push("stage2_" + (i + 1)); imageName.push("stage3_" + (i + 1)); imageName.push("stage4_" + (i + 1));
		imageName.push("bomb1_" + (i + 1));
		imageName.push("itemp2_" + (i + 1)); imageName.push("items2_" + (i + 1)); imageName.push("item02_" + (i + 1));
		if(i < 8){
			imageName.push("enemy2_" + (i + 1));
			imageName.push("enemy3_" + (i + 1));
			imageName.push("enemy5_" + (i + 1) + "_1");
			imageName.push("enemy5_" + (i + 1) + "_2");
			imageName.push("head" + (i + 1));
		}
		if(i < 5){ imageName.push("boss1_" + (i + 1)); }
		if(i < 6){ imageName.push("boss4_" + (i + 1)); }
	}
	var checkLoad = function() {
		status.loadedCount++;
		if(status.loadedCount == imageName.length) {
			initialize(0); status.state = "opening"; 
		}
	};
	status.loadedCount = 0;
	for(var i = 0; i < imageName.length; i++) {
		var image = document.createElement("img");
		image.onload = checkLoad;
		images[imageName[i]] = image;
		image.src = "img/" + imageName[i] + ".png";
	}
	document.body.onmousedown = document.body.ontouchstart = function(e) {
		e.preventDefault();
		e = (e.touches && e.touches[0]) || e;
		status.lastX = e.pageX;
		status.lastY = e.pageY;
		if(status.state == "stageselect"){
			if(status.clearlist.x == 0 && status.lastX>141 && status.lastX<211 && status.lastY>117 && status.lastY<187){
				status.stage = 1; initialize(1);
			}else if(status.clearlist.z == 0 && status.lastX>35 && status.lastX<104 && status.lastY>257 && status.lastY<326){
				status.stage = 3; initialize(3);
			}else if(status.clearlist.y == 0 && status.lastX>231 && status.lastX<300 && status.lastY>259 && status.lastY<328){
				status.stage = 2; initialize(2);
			}else if(status.clearlist.x>0 && status.clearlist.y>0 && status.clearlist.z>0 && 
					status.lastX>136 && status.lastX<205 && status.lastY>222 && status.lastY<291){
				status.stage = 4; initialize(4);
			}
		}else if(status.state == "gameover" || (status.state == "ending" && status.frameCount >= 2600)) {
			if(status.life > 0){
				status.life -= 1; initialize(status.stage);
				status.scoreElement.innerHTML = "000000000".substring(0, 9 - (status.score + "").length) + status.score;
				status.lifeElement.innerHTML = "<br><img src=\"img/option.png\"><font color=\"#ff00ff\">X" +status.life+ "</font>";
				status.paramElement.innerHTML = "<br><br>";
				status.x = (config.width / 2) | 0; status.y = (config.height * 3 / 4) | 0;
				status.shootingpower = 1; status.shootingspread = 1; status.shootingoption = 1;
				status.itemCount = 0; status.enemyCount = 0; status.frameCount = 0;
				status.bullets = {}; status.items = {}; status.enemys = {}; status.gotitems = { x: 0, y: 0, z: 0 };
				var hasitem = 0;
				if(status.clearlist.x > 0 && status.clearlist.y == 0 && status.clearlist.z == 0){
					hasitem = 1;
				}else if(status.clearlist.x == 0 && status.clearlist.y > 0 && status.clearlist.z == 0){
					hasitem = 2;
				}else if(status.clearlist.x == 0 && status.clearlist.y == 0 && status.clearlist.z > 0){
					hasitem = 3;
				}else if(status.clearlist.x > 0 && status.clearlist.y > 0 && status.clearlist.z > 0){
					var hasitem_rand = Math.random()*3;
					if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
				}else if(status.clearlist.x > 0 && status.clearlist.y > 0){
					hasitem = (Math.random()*2 < 1)? 1: 2;
				}else if(status.clearlist.x > 0 && status.clearlist.z > 0){
					hasitem = (Math.random()*2 < 1)? 1: 3;
				}else if(status.clearlist.y > 0 && status.clearlist.z > 0){
					hasitem = (Math.random()*2 < 1)? 2: 3;
				}else{
					if(Math.random()*2<1){
						var hasitem_rand = Math.random()*3;
						if(hasitem_rand < 1){ hasitem = 1; }else if(hasitem_rand < 2){ hasitem = 2; }else if(hasitem_rand < 3){ hasitem = 3; }
					}
				}
				status.items["0" + "i"] = createItem(160, 0, hasitem); status.itemCount++;
			}else{
				status.frameCount = 0; status.state = "opening";
				status.lifeElement.innerHTML = "";
			}
		}else if(status.state == "levelselect"){
			if(status.lastX>=60 && status.lastX<=260 && status.lastY>=84 && status.lastY<=164){
				status.level = 1; status.state == "stageselect"; status.stage = 0; initialize(0);
			}else if(status.lastX>=60 && status.lastX<260 && status.lastY>=184 && status.lastY<=264){
				status.level = 2; status.state == "stageselect"; status.stage = 0; initialize(0);
			}else if(status.lastX>60 && status.lastX<260 && status.lastY>=284 && status.lastY<=364){
				status.level = 3; status.state == "stageselect"; status.stage = 0; initialize(0);
			}
		}else if(status.state == "opening" && status.frameCount>30){
			status.state = "levelselect"; status.frameCount = 0;
		}
	};
	document.body.onmousemove = document.body.ontouchmove = function(e) {
		e = (e.touches && e.touches[0]) || e;
		if((status.state == "gaming" || status.state == "yoin1" || status.state == "yoin2" || status.state == "yoin3" || status.state == "yoin4") && status.lastX != null) {
			status.x += (e.pageX - status.lastX);
			status.y += (e.pageY - status.lastY);
			status.x = ((status.x < 0)? 0: ((status.x > config.width)? config.width: status.x)) | 0;
			status.y = ((status.y < 0)? 0: ((status.y > config.height)? config.height: status.y)) | 0;
		}
		status.lastX = e.pageX; status.lastY = e.pageY;
	};
};
})();