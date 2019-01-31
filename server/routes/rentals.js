const express = require('express')
const multer = require('multer')
const UsersController = require('../controllers/user')
const Rental = require('../models/rental');
const User = require('../models/user')

const router = express.Router()

router.get('/secret', UsersController.authMiddleware, (req,res) => {
  res.json({"secret": true})
})


const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error('Invalid mime type')

    if (isValid) {
      error = null
    }

    cb(error, 'server/images')
  },

  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const extension = MIME_TYPE_MAP[file.mimetype]
    cb(null, name + '-' + Date.now() + '.' + extension)
  }
})

router.get('/search', function(req, res, err) {
  const data = req.query
  // console.log(data)
  // query = {};

  // (reqUrl.city) ? (query.city = reqUrl.city): "";
  // (reqUrl.highPrice) ? (query.price = { $lte: reqUrl.highPrice}): "";
  // (reqUrl.lowPrice) ? (query.price = {$gte: reqUrl.lowPrice}): "";

  if (data) {
    Rental.find(
      {
        city: data.city,
        price: { $gte: data.lowPrice },
        price: { $lte: data.highPrice }
      })
      .select('-booking')
      .exec(function(err, rentals) {
         //console.log(err)
        if(rentals) {
          return res.status(200).json(rentals)
        }
        return res.status(404).json({message: 'No rentals found.'})
    })
  }
})

router.get('', function(req, res, err) {
  Rental.find()
    .select('-booking')
    .exec(function(err, rentals) {
        //console.log(err)
      if(rentals) {
        return res.status(200).json(rentals)
      }
      return res.status(404).json({message: 'No rentals found.'})
  })
})

router.get('/:id', (req, res, err) => {
  Rental.findById(req.params.id)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec((err, rental) => {
      if (err) {
        return res.status(422).json({message: 'Something went wrong.'})
      }
      if(rental) {
        return res.status(200).json(rental)
      }
      return res.status(404).json({message: 'Rental not found.'})
    })
})

router.post('/store', UsersController.authMiddleware, (req, res, err) => {
  const {title, city, street, bedrooms, category, shared, image, price, description} = req.body
  const user = res.locals.user._id

  const rental = new Rental({title, city, street, bedrooms, category, shared, image, price, description, user})

  rental.save(function(err) {
    if (err) {
      return res.status(422).json(err)
    }

    User.update({_id: user}, {$push: {rentals: rental}}, (err) => {
      if (err) {
        return res.status(422).json(err)
      }
    })

    return res.status(200).json({success: 'Rental successfully created.'})
  })
})

module.exports = router;
