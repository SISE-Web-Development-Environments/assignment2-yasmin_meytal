var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var pac_movement=6;
var life=5;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {

	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	updateHearts();
	setUsername();
	initBoard();
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			if (board[i][j] != 4 && board[i][j] != 5) {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				}
			}
		}
	}

	// for (var i = 0; i < 10; i++) {
	// 	board[i] = new Array();
	// 	//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
	// 	for (var j = 0; j < 10; j++) {
	// 		if (
	// 			i==0 || j==0 || i==10-1 || j==10-1
	// 		) {
	// 			board[i][j] = 4;
	// 		} else {
	// 			var randomNum = Math.random();
	// 			if (randomNum <= (1.0 * food_remain) / cnt) {
	// 				food_remain--;
	// 				board[i][j] = 1;
	// 			} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
	// 				shape.i = i;
	// 				shape.j = j;
	// 				pacman_remain--;
	// 				board[i][j] = 2;
	// 			} else {
	// 				board[i][j] = 0;
	// 			}
	// 			cnt--;
	// 		}
	// 	}
	// }
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
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
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
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
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			if (board[i][j] == 2) {
				DrawPacman(context,center.x,center.y);
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
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
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
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
		ctx.drawImage(img, 0, 30, 60, 140);
	}
	else if(life==2){
		ctx.drawImage(img, 0, 30, 60, 140);
		ctx.drawImage(img, 70, 30, 60, 140);
	}
	else if(life==3){
		ctx.drawImage(img, 0, 30, 60, 140);
		ctx.drawImage(img, 70, 30, 60, 140);
		ctx.drawImage(img, 140, 30, 60, 140);
	}
	else if(life==4){
		ctx.drawImage(img, 0, 30, 60, 140);
		ctx.drawImage(img, 70, 30, 60, 140);
		ctx.drawImage(img, 140, 30, 60, 140);
		ctx.drawImage(img, 210, 30, 60, 140);
	}
	else if(life==5){
		ctx.drawImage(img, 0, 20, 60, 140);
		ctx.drawImage(img, 70, 20, 60, 140);
		ctx.drawImage(img, 140, 20, 60, 140);
		ctx.drawImage(img, 210, 20, 60, 140);
		ctx.drawImage(img, 280, 20, 60, 140);
	}



}
function setUsername() {
	lblWelcome.value="TEST";//put the username/?????????????????????????????????????/
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
	board[14]= [4,0,0,4,4,0,0,0,0,0,0,0,0,0,4,0,4,0,0,4];
	board[15]= [4,0,0,4,0,0,0,0,0,4,4,0,0,0,4,0,4,0,0,4];
	board[16]= [4,0,0,4,0,0,0,0,0,4,4,0,0,0,4,0,4,0,0,4];
	board[17]= [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4];
	board[18]= [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4];
	board[19]= [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

}