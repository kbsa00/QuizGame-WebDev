const express = require('express');
const app = express();

require('./models/googleUser');
require('./models/localUser');
require('./services/passport');
require('./middleware/appMiddlewares')(app);
require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Now listening to port ${PORT}`);