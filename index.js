const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/app.js');

const { PORT } = require('./config/config.js');
const { boomErrorHandler } = require('./middlewares/error.handler.js');

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

app.use(boomErrorHandler)

app.listen(PORT, () => {
  console.log(`Server in port ${PORT}`);
});