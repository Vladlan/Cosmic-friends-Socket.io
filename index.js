// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('./node_modules/socket.io')(server);
var port = process.env.PORT || 3100;
var users = 0;


server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    console.log(users);
    if (users < 2) {
        res.redirect('game/game.html')
    }
    else {
        res.send('wait for empty game slot!');
    }
});

//to see headers of request object
app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    //only headers
    for(var name in req.headers)
        s += name + ': ' + req.headers[name] + '\n';
});

app.get('/reqProps', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    //all
    for (var name in req)
        s += name + ': ' + '\n';
    res.send(s);
});

// пользовательская страница 404
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 — Не найдено');
});
// пользовательская страница 500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 — Ошибка сервера');
});

io.on('connection', function(socket) {
    console.log('connection');
    users++;
    console.log('users: ' + users);
    socket.emit('Enter message', users);
    if (users === 2) {
        socket.emit('Allow start', true);
    }
    // when the client emits 'new message',
    // this listens and executes
    socket.on('message', function(msg) {
        console.log(msg);
    });

    socket.on('player 1 moved', function(coors) {
        socket.emit('change pos of P1 for P2', coors);
    });

    socket.on('player 2 moved', function(coors) {
        socket.emit('change pos of P2 for P1', coors);
    });

    socket.on('disconnect', function(msg) {
        users--;
        socket.emit('Enter message', users);
        console.log('user disconnected');
        console.log('users: ' + users);

    });
});
