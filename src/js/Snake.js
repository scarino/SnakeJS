var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

var unitWidth = 25;
var unitHeight = 25;
var numX = 20;
var numY = 20;

var xDir = 0;
var yDir = 1;

var points = 0;
var point = new posObject(10,15);

var snake = new Array();
snake.push(new posObject(10,3));
snake.push(new posObject(10,4));
snake.push(new posObject(10,5));

function posObject(x, y){
	this.xPos = x;
	this.yPos = y;
}

function drawGrid(){	
	ctx.fillStyle = '#FFFFCC';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
	ctx.fillStyle = 'black';
	for(var i = 0; i < snake.length; i++){
		var piece = snake[i];
		ctx.fillRect(piece.xPos * unitWidth, piece.yPos * unitHeight, unitWidth, unitHeight);
	}
}

function drawPoint(){
	ctx.fillStyle = 'red';
	ctx.fillRect(point.xPos * unitWidth, point.yPos * unitHeight, unitWidth, unitHeight);
}

function moveSnake(){
	var pos = snake.shift();
	var head = snake[snake.length-1];
	snake.push(new posObject(head.xPos + xDir, head.yPos + yDir));
}

function checkCollisions(){
	var head = snake[snake.length-1];
	if(head.xPos + xDir < 0 || head.xPos + xDir > numX - 1 || head.yPos + yDir < 0 || head.yPos + yDir > numY - 1){
		endGame();
	}
	
	for(var i = 0; i < snake.length - 1; i++){
		if(head.xPos + xDir == snake[i].xPos && head.yPos + yDir == snake[i].yPos){
			endGame();
		}
	}
	if(head.xPos + xDir == point.xPos && head.yPos + yDir == point.yPos){
		snake.push(point);
		points++;
		newPoint();
		dontMove = true;
	}
	
}

function newPoint(){

	var newPos = new Array();
	for(var i = 0; i < numY; i++){
		for(var j = 0; j < numX; j++){
			newPos.push(new posObject(j,i));
		}
	}
	
	var finalPos = new Array();
	var found = false;
	for(var i = 0; i < newPos.length; i++){
		for(var j = 0; j < snake.length; j++){
			if(newPos[i].xPos == snake[j].xPos && newPos[i].yPos == snake[j].yPos){
				found = true;
			}
		}
		
		if(found == false){
			finalPos.push(newPos[i]);
		}
		found = false;
	}
	
	point = finalPos[Math.floor(Math.random() * finalPos.length )];
}

function drawScore(){
	ctx.fillStyle = 'black';
	ctx.font = "30px Times New Roman";
	ctx.fillText('Points: ' + points,10,canvas.height-20);
}

function checkWin(){
	if(snake.length == numY * numX){
		winGame();
	}
}

var dontMove = false;
function run(){
	drawGrid();
	checkCollisions();
	checkWin();
	if(dontMove == false){
		moveSnake();
	}
	drawSnake();
	drawPoint();
	drawScore();
	pressed = 0;
	dontMove = false;
}

function endGame(){
	clearInterval(gameLoop);
	ctx.fillStyle = 'black';
	ctx.font = "40px Times New Roman";
	ctx.fillText('Game Over',canvas.width/2 - 90,canvas.height/2);
}

function winGame(){
	clearInterval(gameLoop);
	ctx.fillStyle = 'black';
	ctx.font = "40px Times New Roman";
	ctx.fillText('You Win!',canvas.width/2 - 90,canvas.height/2);
}

var pressed = 0;
function start(){
	gameLoop = setInterval(run,100);
	
	$(document).keydown(function(evt) {
		if(pressed == 0){
			if (evt.keyCode == 38 && yDir == 0) {
				yDir = -1;
				xDir = 0;
				pressed = 1;
			} else if (evt.keyCode == 40 && yDir == 0){
				yDir = 1;
				xDir = 0;
				pressed = 1;
			} else if (evt.keyCode == 37 && xDir == 0){
				yDir = 0;
				xDir = -1;
				pressed = 1;
			} else if (evt.keyCode == 39 && xDir == 0){
				yDir = 0;
				xDir = 1;
				pressed = 1;
			}
		}
	});
}

start();


