const Rental = require('./models/rental')
const User = require('./models/user')
const Booking = require('./models/booking')

const dbData = require('./data.json')


class SeedDatabase {
  constructor() {
    this.rentals = dbData.rentals
    this.users = dbData.users
  }

  async cleanDb() {
    await User.remove({})
    await Rental.remove({})
    await Booking.remove({})
  }

  pushRentalsToDb() {
    const user = new User(this.users[0])
    const user2 = new User(this.users[1])

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental)
      newRental.user = user2
      user2.rentals.push(newRental)
      newRental.save();
    })

    user.save()
    user2.save()
  }

  async seedDb() {
    await this.cleanDb()
    this.pushRentalsToDb()
  }
}

module.exports = SeedDatabase
