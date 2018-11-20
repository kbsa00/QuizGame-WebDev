let questions = require('./Game/QuestionGenerate');

module.exports = (io) => {
    io.on('connection', function (socket) {

        socket.on('disconnect', function () {
        });

        socket.on('onSending_Message', (msg) => {
            io.emit('onRecieve_Message', msg);
        });

        socket.on('findGame', (data) => {
            socket.join(data.MatchToken);
          
            let room = io.sockets.adapter.rooms[data.MatchToken];
            io.in(data.MatchToken).emit(data.MatchToken, room.length);
           
        });

        socket.on('startGame', (data) => {
            io.emit('starting_game', {
                gametoken: data.MatchToken
            });
        });

        socket.on('quiz', (data) => {
            if(data === 'new_question') io.emit('game', questions.GetQuestion());
        });

        socket.on('rank', (data) => {
          io.emit('scoreranks', {matchtoken: data.matchtoken, username: data.username, points: data.points});
        });
    });
};