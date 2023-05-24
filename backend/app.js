const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const verifyCaptchaRoute = require('./routes/verify-captcha');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(bodyParser.json());

const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(mongodbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to MongoDB Atlas');
});

app.use('/posts', postRoutes);
app.use('/', verifyCaptchaRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
