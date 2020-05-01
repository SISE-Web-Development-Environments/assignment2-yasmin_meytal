var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval1;
var checkInterval;
var pac_movement=6;
var life=5;
var upKey;
var rightKey;
var leftKey;
var downKey;
var pacman_remain = 1;
var ghost1=new Object();
var g1_lastMove=new Object();
var ghost2=null;
var g2_lastMove=null;
var ghost3=null;
var g3_lastMove=null;
var ghost4=null;
var g4_lastMove=null;



//setting from user
var color_p5 = "#ffffff";
var color_p15 = "#1900ff";
var color_p25 = "#e52929";
var balls;
var ghosts;
var time;
var numOfEatenFood=0;




$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	life=5;
	score = 0;
	pac_color = "yellow";
	start_time = new Date();
	numOfEatenFood=0;
	initBoard();
	initGhost();//the ghost need to start from the corner.
	pacmanStartPosition();
	defineBalls();
	keysDown = {};
	
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	interval = setInterval(UpdatePosition, 300);
	interval1=setInterval(updateGhostPosition,600);
	checkInterval=setInterval(checkCondition,50);

}
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {//left
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {//right
		if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {//up
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {//down
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score+=5;
		numOfEatenFood++;
	}
	if (board[shape.i][shape.j] == 15) {
		score+=15;
		numOfEatenFood++;
	}
	if (board[shape.i][shape.j] == 25) {
		score+=25;
		numOfEatenFood++;
	}
	board[shape.i][shape.j] = 2;


	let currentTime = new Date();
	let currTime=(currentTime - start_time) ;
	time_elapsed = time-currTime/1000;

	if((time_elapsed<=0 && time_elapsed>-0.4) || life==0){
		gameOver();
	}


	else if (numOfEatenFood==balls || score>600) {
		clearInterval(interval);
		clearInterval(interval1);
		clearInterval(checkInterval);
		window.alert("You win!!!");
		Start();
	} else {
		Draw();
	}


}


function pacmanStartPosition(){
	let c=findRandomEmptyCell(board);
	shape.i = c[0];
	shape.j = c[1];
	board[c[0]][c[1]] = 2;
	pacman_remain--;
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 19 + 1);
	while (board[i][j] != 0  ) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 19 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		pac_movement=1;
		return 1;
	}
	if (keysDown[40]) {
		pac_movement=2;
		return 2;
	}
	if (keysDown[37]) {
		pac_movement=3;
		return 3;
	}
	if (keysDown[39]) {
		pac_movement=4;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board

	// updateHearts();

	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblWelcome.value = cur_user;

	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			if (board[i][j] == 2) {
				DrawPacman(context,center.x,center.y);
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle =color_p5; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle =color_p15; //color
				context.fill();
			}else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle =color_p25; //color
				context.fill();
			}else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if(board[i][j]==6 || board[i][j]==11|| board[i][j]==21 || board[i][j]==31){
				drawGhost(6);
			}
			else if(board[i][j]==7 || board[i][j]==12|| board[i][j]==22 || board[i][j]==31){
				drawGhost(7);
			}
			else if(board[i][j]==8 || board[i][j]==13|| board[i][j]==23 || board[i][j]==33){
				drawGhost(8);
			}
			else if(board[i][j]==9 || board[i][j]==14|| board[i][j]==24 || board[i][j]==34){
				drawGhost(9);
			}
		}
	}
}



function DrawPacman(ctx, x, y) {
	ctx.beginPath();
	if (pac_movement==1) {
		ctx.arc(x, y, 14, 1.65 * Math.PI, 1.35 * Math.PI);
		ctx.lineTo(x, y);
		ctx.fillStyle = pac_color; //color
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x - 13, y - 0, 2, 0, 2 * Math.PI);
		ctx.fillStyle = "black"; //color
		ctx.fill();
	}
	else if (pac_movement==2) {
		ctx.arc(x, y, 14, 0.65 * Math.PI, 0.35 * Math.PI);
		ctx.lineTo(x, y);
		ctx.fillStyle = pac_color; //color
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x + 13, y - 0, 2, 0, 2 * Math.PI);
		ctx.fillStyle = "black"; //color
		ctx.fill();
	}
	else if (pac_movement==4) {
		ctx.arc(x, y, 14, 0.15 * Math.PI, 1.85 * Math.PI);
		ctx.lineTo(x, y);
		ctx.fillStyle = pac_color; //color
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x + 5, y - 10, 2, 0, 2 * Math.PI);
		ctx.fillStyle = "black"; //color
		ctx.fill();
	}
	else if (pac_movement==3) {
		ctx.arc(x, y, 14, 1.15 * Math.PI, 0.85 * Math.PI);
		ctx.lineTo(x, y);
		ctx.fillStyle = pac_color; //color
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x - 5, y - 10, 2, 0, 2 * Math.PI);
		ctx.fillStyle = "black"; //color
		ctx.fill();
	}
	else{
		ctx.arc(x, y, 14, 0.15 * Math.PI, 1.85 * Math.PI);
		ctx.lineTo(x, y);
		ctx.fillStyle = pac_color; //color
		ctx.fill();
		ctx.beginPath();
		ctx.arc(x + 5, y - 10, 2, 0, 2 * Math.PI);
		ctx.fillStyle = "black"; //color
		ctx.fill();
	}
	ctx.closePath();

}

function updateHearts() {
	var canvas = document.getElementById('lblHeart');
	var img = document.getElementById("heart");
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(life==1){
		ctx.drawImage(img, 0, 20, 50, 140);
	}
	else if(life==2){
		ctx.drawImage(img, 0, 20, 50, 140);
		ctx.drawImage(img, 60, 20, 50, 140);
	}
	else if(life==3){
		ctx.drawImage(img, 0, 20, 50, 140);
		ctx.drawImage(img, 60, 20, 50, 140);
		ctx.drawImage(img, 120, 20, 50, 140);
	}
	else if(life==4){
		ctx.drawImage(img, 0, 20, 50, 140);
		ctx.drawImage(img, 60, 20, 50, 140);
		ctx.drawImage(img, 120, 20, 50, 140);
		ctx.drawImage(img, 180, 20, 50, 140);
	}
	else if(life==5){
		ctx.drawImage(img, 0, 20, 50, 140);
		ctx.drawImage(img, 60, 20, 50, 140);
		ctx.drawImage(img, 120, 20, 50, 140);
		ctx.drawImage(img, 180, 20, 50, 140);
		ctx.drawImage(img, 240, 20, 50, 140);
	}



}

function initBoard() {
	board[0]= [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
	board[1]= [4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,4];
	board[2]= [4,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4,0,0,0,4];
	board[3]= [4,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4,0,0,0,4];
	board[4]= [4,0,0,4,4,4,0,0,0,0,0,0,0,0,4,4,4,0,0,4];
	board[5]= [4,0,0,4,4,4,0,0,0,0,0,0,0,0,0,4,0,0,0,4];
	board[6]= [4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4];
	board[7]= [4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4];
	board[8]= [4,0,0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,4];
	board[9]= [4,0,0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,4];
	board[10]=[4,0,0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,4];
	board[11]= [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4];
	board[12]= [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4];
	board[13]= [4,0,0,4,4,0,0,0,0,0,0,0,0,0,4,4,4,0,0,4];
	board[14]= [4,0,0,4,4,0,0,0,0,0,0,0,0,0,4,4,4,0,0,4];
	board[15]= [4,0,0,4,0,0,0,0,0,4,4,0,0,0,4,4,4,0,0,4];
	board[16]= [4,0,0,4,0,0,0,0,0,4,4,0,0,0,4,4,4,0,0,4];
	board[17]= [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4];
	board[18]= [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4];
	board[19]= [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
	//defineBalls();
}

function saveSettings(colorP5,colorP15, colorP25,ball,ghost,timer){
	color_p5=colorP5;
	color_p15=colorP15;
	color_p25=colorP25;
	balls=ball;
	ghosts=ghost;
	time=timer;
}

function setKeys(up,down,right,left) {
	upKey = up;
	downKey = down;
	rightKey = right;
	leftKey = left;
}

function defineBalls() {
	counter = 0;
	var b25 = Math.floor(balls * 0.1);
	var b15 = Math.floor(balls * 0.3);
	var b5 = Math.floor(balls * 0.6);
	var cell;
	for (var i = 0; i < b5; i++) {
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 5;
		counter++;
	}
	for (var i = 0; i < b15; i++) {
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 15;
		counter++;
	}
	for (var i = 0; i < b25; i++) {
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 25;
		counter++;
	}
	while (counter <= balls) {
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 5;
		counter++;
	}

}


function gameOver() {
	$('#gameBoard').hide();
	$('#gameOver').show();
}


function initGhost() {
	ghost1.i=1;
	ghost1.j=1;
	board[1][1]=6;
	g1_lastMove.i=1;
	g1_lastMove.j=1;
	 if(ghosts>1){
	 	ghost2=new Object();
	 	g2_lastMove=new Object();
		 ghost2.i=1;
		 ghost2.j=18;
		 board[1][18]=7;
		 g2_lastMove.i=1;
		 g2_lastMove.j=18;
	 }
	if(ghosts>2){
		ghost3=new Object();
		g3_lastMove=new Object();
		ghost3.i=18;
		ghost3.j=1;
		board[18][1]=8;
		g3_lastMove.i=18;
		g3_lastMove.j=1;
	}
	if(ghosts>3){
		ghost4=new Object();
		g4_lastMove=new Object();
		ghost4.i=18;
		ghost4.j=18;
		board[18][18]=9;
		g4_lastMove.i=18;
		g4_lastMove.j=18;
	}
}

function drawGhost(x) {
	if(x==6) {
		var g = document.getElementById("gh1");
		context.drawImage(g, ghost1.i * 30, ghost1.j * 30 - 2, 35, 35);
	}
	if(x==7){
		g=document.getElementById("gh2");
		context.drawImage(g,ghost2.i* 30 ,ghost2.j* 30-2 ,35,35);
	}
	if(x==8){
		g=document.getElementById("gh3");
		context.drawImage(g,ghost3.i* 30 ,ghost3.j* 30-2 ,35,35);
	}
	if(x==9){
		g=document.getElementById("gh4");
		context.drawImage(g,ghost4.i* 30 ,ghost4.j* 30-2 ,35,35);
	}
}

function checkPacmanAndGhost() {
	if(shape.i==ghost1.i && shape.j==ghost1.j){
		return true;
	}
	else if(ghosts>1 && shape.i==ghost2.i && shape.j==ghost2.j){
		return true;
	}else if(ghosts>2 && shape.i==ghost3.i && shape.j==ghost3.j){
		return true;
	}else if(ghosts>3 && shape.i==ghost4.i && shape.j==ghost4.j){
		return true;
	}
	return false;
}

function updateGhostPosition(){
	updateHearts();
	//ghost1
	let move=optimalMove(ghost1.i,ghost1.j,g1_lastMove.i,g1_lastMove.j);
	board[ghost1.i][ghost1.j]=board[ghost1.i][ghost1.j]-6;
	board[move[0]][move[1]]=board[move[0]][move[1]]+6;
	g1_lastMove.i=ghost1.i;
	g1_lastMove.j=ghost1.j;
	ghost1.i=move[0];
	ghost1.j=move[1];
	if(ghosts>1){
		//ghost2
		move=optimalMove(ghost2.i,ghost2.j,g2_lastMove.i,g2_lastMove.j);
		board[ghost2.i][ghost2.j]=board[ghost2.i][ghost2.j]-7;
		board[move[0]][move[1]]=board[move[0]][move[1]]+7;
		g2_lastMove.i=ghost2.i;
		g2_lastMove.j=ghost2.j;
		ghost2.i=move[0];
		ghost2.j=move[1];
	}
	if(ghosts>2){
		//ghost3
		move=optimalMove(ghost3.i,ghost3.j,g3_lastMove.i,g3_lastMove.j);
		board[ghost3.i][ghost3.j]=board[ghost3.i][ghost3.j]-8;
		board[move[0]][move[1]]=board[move[0]][move[1]]+8;
		g3_lastMove.i=ghost3.i;
		g3_lastMove.j=ghost3.j;
		ghost3.i=move[0];
		ghost3.j=move[1];
	}
	if(ghosts>3){
		//ghost4
		move=optimalMove(ghost4.i,ghost4.j,g4_lastMove.i,g4_lastMove.j);
		board[ghost4.i][ghost4.j]=board[ghost4.i][ghost4.j]-9;
		board[move[0]][move[1]]=board[move[0]][move[1]]+9;
		g4_lastMove.i=ghost4.i;
		g4_lastMove.j=ghost4.j;
		ghost4.i=move[0];
		ghost4.j=move[1];
	}

	// if(checkPacmanAndGhost()){
	// 	restart();
	// }
	// else{
	// 	drawGhosts();
	// }

}

function optimalMove(x,y,lastX,lastY){
	let minDist=100000;
	let move_i=0;
	let move_j=0;
	if(x+1<19 && board[x+1][y]!=4 && (x+1!=lastX || y!=lastY && !checkGhost(x+1,y) )){
		if(distance(x+1,y,shape.i,shape.j)<minDist){
			minDist=distance(x+1,y,shape.i,shape.j);
			move_i=x+1;
			move_j=y;
		}
	}
	if(x-1>0 && board[x-1][y]!=4 && (x-1!=lastX || y!=lastY ) && !checkGhost(x-1,y)) {
		if(distance(x-1,y,shape.i,shape.j)<minDist){
			minDist=distance(x-1,y,shape.i,shape.j);
			move_i=x-1;
			move_j=y;
		}
	}
	if(y+1<19 && board[x][y+1]!=4 && (x!=lastX || y+1!=lastY ) && !checkGhost(x,y+1) ){
		if(distance(x,y+1,shape.i,shape.j)<minDist){
			minDist=distance(x,y+1,shape.i,shape.j);
			move_i=x;
			move_j=y+1;
		}
	}
	if(y-1>0 && board[x][y-1]!= 4 && (x!=lastX || y-1!=lastY ) && !checkGhost(x,y+1)){
		if(distance(x,y-1,shape.i,shape.j)<minDist){
			minDist=distance(x,y-1,shape.i,shape.j);
			move_i=x;
			move_j=y-1;
		}
	}
	return[move_i,move_j];
}

function distance(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function restart() {
	board[ghost1.i][ghost1.j]=board[ghost1.i][ghost1.j]-6;
	if(ghosts>1){
		board[ghost2.i][ghost2.j]=board[ghost2.i][ghost2.j]-7;
	}
	if(ghosts>2){
		board[ghost3.i][ghost3.j]=board[ghost3.i][ghost3.j]-8;
	}
	if(ghosts>3){
		board[ghost3.i][ghost3.j]=board[ghost3.i][ghost3.j]-9;
	}
	initGhost();
	board[shape.i][shape.j]=board[shape.i][shape.j]-2;
	pacmanStartPosition();
	score-=10;
	life-=1;
}

function checkGhost(i,j){
	if(board[i][j]==6 || board[i][j]==11|| board[i][j]==21 || board[i][j]==31){
		return true;
	}
	else if(board[i][j]==7 || board[i][j]==12|| board[i][j]==22 || board[i][j]==31){
		return true;
	}
	else if(board[i][j]==8 || board[i][j]==13|| board[i][j]==23 || board[i][j]==33){
		return true;
	}
	else if(board[i][j]==9 || board[i][j]==14|| board[i][j]==24 || board[i][j]==34){
		return true;
	}
	return false;
}

function checkCondition() {
	var currentTime = new Date();
	let currTime=(currentTime - start_time) ;
	time_elapsed = time-currTime/1000;

	if(checkPacmanAndGhost()){
		restart();
	}
	else if((time_elapsed<=0 && time_elapsed>-0.4) || life==0){
		window.clearInterval(interval);
		gameOver();
	}
 	// else if (numOfEatenFood==balls || score>600) {
		//  	window.clearInterval(interval);
		// 	window.alert("Game completed");
		// 	score=0;
		// 	numOfEatenFood=0;
		// 	$('#gameBoard').hide();
		// 	$('#settings').show();
 	// }

}

$('#newGame').click(function () {
	hidefunc();
	$("#gameOver").hide();
	$("#game").show();
	$("#gameBoard").show();

	clearInterval(interval);
	clearInterval(interval1);
	clearInterval(checkInterval);
	window.alert("Start new Game!!!");
	Start();

});