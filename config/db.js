const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = 'mongodb://admin:password@mongo:6000/applicants?authSource=admin';

mongoose.connect(url, { useNewUrlParser: true}, function(err){
  if (err) {
    console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
    setTimeout(connectWithRetry, 1000);}
  });

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected:', url)
})

  db.on('error', err => {
    console.error('connection error:', err)
  });

module.exports = db;

