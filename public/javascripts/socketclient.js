
console.log('socket client')

var socket = io();
socket.on('functionName', function(data){
  console.log(data);
})


socket.on('totalUsers', function(users){
  console.log('total users ' + users)
  updateUsers(users);
})


socket.on('newSquare', function(square){
  drawSquare(square);
});


socket.on('allSquares', function(squares){
  for (var s = 0 ; s < squares.length ; s++) {
    drawSquare(squares[s]);
  }
});


socket.on('clear', function() {
  resetCanvas();
})


socket.on('timerUpdate', function(timeleft){
  console.log('timer update ' + timeleft)
   updateTimer(timeleft);
})


function sendSquare(square) {
  socket.emit('clientDrewSquare', square);
}
