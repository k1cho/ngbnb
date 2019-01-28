const Booking = require('../models/booking')
const Rental = require('../models/rental')
const User = require('../models/user')
const moment = require('moment')

exports.store = (req, res, err) => {
  const { startAt, endAt, totalPrice, guests, days, rental} = req.body
  const user = res.locals.user

  const booking = new Booking({
    startAt, endAt, totalPrice, guests, days
  })

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({message: 'Error.'})
      }

      if (foundRental.user._id === user._id) {
        return res.status(422).send({message: 'You cannot create a booking on your own rental.'})
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user
        booking.rental = foundRental
        foundRental.bookings.push(booking)

        booking.save((err) => {
          if (err) {
            return res.status(422).send({message: 'Error.'})
          }

          foundRental.save()
          User.update({_id: user._id}, {$push: {bookings: booking}}, (err) => {
            console.log(err)
          })
        })

        return res.json({'created': 'true'})
      } else {
        return res.status(422).send({message: 'Chosen dates are already taken.'})
      }
    })
}

function isValidBooking(proposedBooking, rental) {
  let isValid = true

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every((booking) => {
      const proposedStart = moment(proposedBooking.startAt)
      const proposedEnd = moment(proposedBooking.endAt)

      const actualStart = moment(booking.startAt)
      const actualEnd = moment(booking.endAt
)
      if ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)) {
        return true
      } else {
        return false
      }
    })
  }
  return isValid
}
