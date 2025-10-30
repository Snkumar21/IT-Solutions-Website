require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

// static-host frontend if desired (optional)
// app.use(express.static('../frontend')); // careful path in deployment

app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/itcompany';

mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server started on',PORT));
  })
  .catch(err => {
    console.error('Mongo connect error', err);
  });