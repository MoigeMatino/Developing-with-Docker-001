const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = 'mongodb://admin:password@mongo:5500/applicants?authSource=admin';

mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

var db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected:', url)
})

  db.on('error', err => {
    console.error('connection error:', err)
  });

module.exports = db;

