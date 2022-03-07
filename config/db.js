const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.DB_CONNECTION;

mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected:', url)
  })
  
  db.on('error', err => {
    console.error('connection error:', err)
  });










