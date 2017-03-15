console.log('the engine')

var totalUsers = 0;

var secondsLeft = 60;

var squares = [];

var active = false;

function init(io) {

  io.on('connect', function(socket){

    if (!active) {
      startCountdown(socket);
      active = true;
    }

    console.log('someone connected ' + socket);
    totalUsers++;

    //Send this user all current squares
    socket.emit('allSquares', squares);

    //Update all users with the total number of users
    io.sockets.emit('totalUsers', totalUsers);

    socket.on('clientDrewSquare', function(square){
      console.log('draw square recd. ')
      console.log(square);
      //tell everyone (apart from the client that sent the message) that there is a new square to draw
      socket.broadcast.emit('newSquare', square);
      squares.push(square);
      
    });

    socket.on('disconnect', function(){
      console.log('someone disconnected ' + socket )
      totalUsers--;
      io.sockets.emit('totalUsers', totalUsers);
    });

  })
}

function startCountdown(socket) {

  var timePermitted = 20;
  var seconds = timePermitted;

  socket.broadcast.emit('timerUpdate', seconds);

  var countdownInterval = 1;

  // 5 second repeating timer
  setInterval(function(){

    seconds = seconds - countdownInterval;
    console.log('tick ' + seconds)

    socket.broadcast.emit('timerUpdate', seconds);

    if (seconds <= 0 ) {
      socket.broadcast.emit('clear');
      squares = [];
      seconds = timePermitted;
    }

  }, 1000*countdownInterval);
}

module.exports = init;
