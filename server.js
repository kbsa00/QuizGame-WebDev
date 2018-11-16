const express = require('express');
const socket = require('socket.io'); 
const app = express();
const http = require('http');

require('./services/passport');
require('./models/localUser');
require('./middleware/appMiddlewares')(app);
require('./routes/authRoutes')(app);
require('./routes/gameRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'dist', 'index.html'));
    });
}

const server = http.Server(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log(`Now listening to port ${PORT}`);
const io = socket(server);
require('./socket/socketHandling')(io);