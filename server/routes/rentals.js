const express = require('express')
const multer = require('multer')
const UserController = require('../controllers/user')

const router = express.Router()

router.get('/secret', UserController.authMiddleware, (req,res) => {
  res.json({"secret": true})
})

const Rental = require('../models/rental');

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

/*
router.get('', (req, res, err) => {
  let data = req.query
  //console.log(data)

  if (data.city || data.category || data.price || data.shared || data.bedrooms) {
    Rental.find(
      {
        $and:
        [
          { city: data.city },
          { price: { $lte: data.price } },
          { shared: data.shared },
          { category: data.category }
        ]
      })
      .select('-booking')
      .exec((rentals) => {
        if(rentals) {
          return res.status(200).json(rentals)
        }
        return res.status(404).json({message: 'No rentals found.'})
      })
  } else {
    Rental.find()
    .select('-bookings')
    .exec((err, rentals) => {
      if (err) {
        return res.status(422).json({message: 'Something went wrong.'})
      }
      if(rentals)
      {
        return res.status(200).json(rentals)
      }
      return res.status(404).json({message: 'No rentals found.'})
    })
  }
})
*/

router.get('', (req, res, err) => {
  const data = req.query
  //console.log(data)

  if (data) {
    Rental.find({city: data.city})
      .select('-booking')
      .exec((rentals) => {
        if(rentals) {
          return res.status(200).json(rentals)
        }
        return res.status(404).json({message: 'No rentals found.'})
      })
  } else {
    Rental.find()
    .select('-bookings')
    .exec((err, rentals) => {
      if (err) {
        return res.status(422).json({message: 'Something went wrong.'})
      }
      if(rentals)
      {
        return res.status(200).json(rentals)
      }
      return res.status(404).json({message: 'No rentals found.'})
    })
  }
})

router.get('/:id', (req, res, err) => {
  Rental.findById(req.params.id)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec((err, rental) => {
      if (err) {
        return res.status(422).json({error: {message: 'Something went wrong.'}})
      }
      if(rental) {
        return res.status(404).json({message: 'Rental not found.'})
      }

      return res.status(200).json(rental)
    })
})

module.exports = router;
