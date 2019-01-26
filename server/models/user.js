const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Username is required'
  },
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: true
  },
  rentals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  }]
})

userSchema.methods.isSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
