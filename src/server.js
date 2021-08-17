const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// routes
const uploadedImageRoute = require('./routes/uploadedImg');

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log('connected to database');
  }
);

app.use(cors({ origin: `${process.env.ORIGIN}` }));
app.use(express.json({ limit: '100mb' }));
app.use('/public', express.static(path.join(__dirname, '/uploads')));

// use routes
app.use('/api/v1', uploadedImageRoute);

app.get('/', (req, res) => {
  res.status(202).send('working fine!');
});

app.listen(
  process.env.PORT,
  console.log(`server running on ${process.env.PORT}`)
);
