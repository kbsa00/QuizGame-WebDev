const bodyParser = require('body-parser');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const cors = require('cors'); 


module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(cors());
    mongoose.set('useCreateIndex', true);
    mongoose.connect(keys.mongo_URI, {
        useNewUrlParser: true
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/dist'));
      
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
        });
      }
}