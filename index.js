var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


users = [];

io.on('connection', function(socket){
    console.log('User is connected!');
    socket.on('setUsername', function(data){
        if(users.indexOf(data) > -1){
            socket.emit('userAlreadyExists', data + ' already exists. Try another name !')
        }else{
            users.push(data);
            socket.emit('newUserSet', { username : data})
        }
    });
    socket.on('msg', function(data){
        io.sockets.emit('NewMessage', data);    
    })
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
http.listen(3000, function(){
    console.log('Server is running at port 3000')
});