var Client = {};

Client.socket = io.connect('http://localhost:3100');
Client.playerId = null;
Client.allowStart = false;

Client.socket.on('Enter message', function(msg) {
    Client.playerId = msg;
});
Client.socket.on('Allow start', function(msg) {
    Client.allowStart = msg;
    console.log(`allow start game = ${msg}`);
});

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    console.log(e.keyCode);

    //FOR Player 1
    if (e.keyCode == '38') {
        // up arrow
        console.log('user #' + playerId + ' pressed up arrow');
    }
    else if (e.keyCode == '40') {
        // down arrow
        console.log('user #' + playerId + ' pressed down arrow');
    }
    else if (e.keyCode == '37') {
        // left arrow
        console.log('user #' + playerId + ' pressed left arrow');
    }
    else if (e.keyCode == '39') {
        // right arrow
        console.log('user #' + playerId + ' pressed right arrow');
    }
    else if (e.keyCode == '48') {
        console.log('user #' + playerId + ' pressed zero');
        //zero
    }

    //FOR PLAYER 2
    if (e.keyCode == '68') {
        //d
        console.log('user #' + playerId + ' pressed D');
    }
    else if (e.keyCode == '83') {
        console.log('user #' + playerId + ' pressed S');
        //s
    }
    else if (e.keyCode == '65') {
        //a
        console.log('user #' + playerId + ' pressed A');
    }
    else if (e.keyCode == '87') {
        console.log('user #' + playerId + ' pressed W');
        //w
    }
    else if (e.keyCode == '32') {
        console.log('user #' + playerId + ' pressed spacebar');
        //spacebar
    }
}
