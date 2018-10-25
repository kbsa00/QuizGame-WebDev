const express = require('express');
const app = express();

require('./services/passport');
require('./models/localUser');
require('./middleware/appMiddlewares')(app);
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Now listening to port ${PORT}`);