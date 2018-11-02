module.exports =  (io) => {
    
    io.on('connection', function (socket){

        socket.on('disconnect', function(){
            console.log(socket.id)
            console.log('disconnected'); 
        });
        
        socket.on('onSending_Message', (msg) => { 
            io.emit('onRecieve_Message', msg);
        });
    });
};