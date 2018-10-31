module.exports =  (io) => {
    
    io.on('connection', function (socket){

        socket.on('createGame', function(data){
            console.log(io.nsps['/'].adapter.rooms);
        });
        
        
        socket.on('joinGame', function(data){
            socket.join(data.room);
            console.log(io.nsps['/'].adapter.rooms[data.room]);
        });

        socket.on('disconnect', function(){
            console.log(socket.id)
            console.log('disconnected'); 
        });
        
        socket.on('onSending_Message', (msg) => {
            console.log(msg.message); 
            io.emit('onRecieve_Message', msg);
        });
    });
};