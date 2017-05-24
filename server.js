var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port: 3001 });
//console.log(server.listener);

//var io = require('socket.io')(server.listener)

var socket = require('socket.io-client')('http://localhost:4001');
//var socket = io.connect('http://localhost:4001');

server.register(require('inert'), function(err){

  if(err){
    throw err;
  }

  server.route({

    method: 'GET',
    path: '/',
    handler: function(request, reply){
      
      reply('Starting......');
      //reply.file('index.html');
    }
  });

  server.start(function() {

    console.log('Server is running at: ', server.info.uri);
  });

});

//socket.on('msg', function(data){
  //console.log('Client: ' + data);
//socket.emit('msg', { desID: 'LDiQ1QlR6wuzw5iMAAAA'});

//});

socket.on('io:welcome', function(data){
  console.log(data);
  socket.emit('io:name', 'Freeman');
  socket.emit('io:message', { 'myid':data.yourID,'did': data.mngID,'t':'XinChaoMoinguoi'});
  //socket.emit('io:message', {'did':'U9358lFCuBe4RGgfAAAA','t':'ChaoBan'});
});

socket.on('newuser', function(rs){
  console.log('From Client 2___ ' + rs);
});

socket.on('chat:messages:latest', function(msg){
  console.log(msg.t);

});

/*io.on('connection', function(socket){
  socket.emit('news', { hello: 'world' });
  socket.on('something', function(data){
    console.log(data);
  });
});*/


