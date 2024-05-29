const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');

const router = require('./routers');
const NotFoundMiddleware = require('./middleware/not found');
const ErrorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port} at http://localhost:${port}`);
});
