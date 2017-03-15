console.log('drawing')

var canvas = document.getElementById('drawing');
var timer = document.getElementById('timer');

var pendown = false;

var context = canvas.getContext('2d');

var initialColor = '#FF00FF';   //pink
context.fillStyle = initialColor;

resetCanvas();

var colorpicker = document.getElementById('color');
colorpicker.value = initialColor;

colorpicker.oninput = function(){
  context.fillStyle = colorpicker.value;
}

canvas.onmousedown = function() {
  pendown = true;
}

canvas.onmouseup = function() {
  pendown = false;
}

canvas.onmousemove = function() {
  if (pendown) {
    draw(event);
  }
}

canvas.onclick = function() {
  draw(event);
}


function draw(event) {
  var square = { x: event.offsetX, y: event.offsetY, color: context.fillStyle }
  sendSquare(square)   // send message to server
  drawSquare(square)   // draw it on canvas
}


function drawSquare(square) {
  currentcolor = context.fillStyle;    // Remember user's current color
  context.fillStyle = square.color;    // Use square color to draw
  context.fillRect(square.x-5, square.y-5, 10, 10);
  context.fillStyle = currentcolor;    // and revert to user's color
}


function resetCanvas() {
  currentcolor = context.fillStyle;    // Remember current color
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.height, canvas.width)   // Create black background
  context.fillStyle = currentcolor;
}


function updateTimer(secondsLeft) {
  if (secondsLeft == 0) {
    timer.innerHTML = 'Time\'s up! Clearing drawings';
  }

  timer.innerHTML = secondsLeft + ' seconds left to draw!';
}


function updateUsers(users) {
  console.log('update users')
  document.getElementById('totalUsers').innerHTML = users;
}
