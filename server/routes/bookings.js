const express = require('express')
const UsersController = require('../controllers/user')
const BookingsController = require('../controllers/booking')

const router = express.Router()

router.post('', UsersController.authMiddleware, BookingsController.storeBooking)

router.get('/manage', UsersController.authMiddleware, BookingsController.getUserBookings)

module.exports = router
