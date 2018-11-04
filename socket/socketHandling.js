module.exports = (io) => {
    io.on('connection', function (socket) {

        socket.on('disconnect', function () {
            console.log(socket.id)
            console.log('disconnected');
        });
        
        socket.on('onSending_Message', (msg) => {
            io.emit('onRecieve_Message', msg);
        });

        socket.on('findGame', (data) => {
            console.log(`${data.user} joins room ${data.MatchToken}`);
            socket.join(data.MatchToken);
            io.in(data.MatchToken).emit(data.MatchToken, `${data.user} has joined the room`);
            let room = io.sockets.adapter.rooms[data.MatchToken];
            console.log(`Amount of people in the room ${room.length} - ${data.MatchToken}`);
        });
    });
};