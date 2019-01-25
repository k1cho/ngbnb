const express = require('express');
const rentalRoutes = require('./routes/rentals');
const bodyParser = require('body-parser');
const path = require('path')

const mongoose = require('mongoose');

const app = express();

const SeedDatabase = require('./seed-database')

mongoose.connect('mongodb+srv://bkichob:mAMz7xnuk4H731Eo@cluster0-vcppn.mongodb.net/ngbnb?retryWrites=true')
    .then(() => {
      // const fakeDb = new SeedDatabase()
      // fakeDb.pushRentalsToDb()

      console.log('Connected to database');
    })
    .catch(() => {
      console.log('Connection error');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join('server/images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
})

app.use('/api/rentals', rentalRoutes)

module.exports = app;
