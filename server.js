const express = require('express');
const socket = require('socket.io'); 
const app = express();
const http = require('http');

require('./services/passport');
require('./models/localUser');
require('./routes/authRoutes')(app);
require('./routes/gameRoutes')(app); 
require('./middleware/appMiddlewares')(app);

const server = http.Server(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log(`Now listening to port ${PORT}`);
const io = socket(server);
require('./socket/socketHandling')(io);