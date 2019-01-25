const express = require('express')
const multer = require('multer')

const router = express.Router()

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


router.get('', (req, res, err) => {
  Rental.find().then(rentals => {
    res.status(200).json(rentals)
  })
})


router.get('/:id', (req, res, err) => {
  Rental.findById(req.params.id).then(rental => {
    res.status(200).json(rental)
  }).catch(error => {
    res.status(404).json({error: {message: 'Rental not found'}})
  })
})

module.exports = router;
