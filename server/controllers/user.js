const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'jsonwebtokenrandomstring'


exports.auth = function(req, res) {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(422).send({message: 'Please provide email and password'})
  }

  User.findOne({email}, function (err, user) {
    if (err) {
      return res.status(422).send({message: err.message})
    }
    if (!user) {
      return res.status(422).send({message: 'This user does not exist.'})
    }

    if(user.isSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        email: user.email
      }, secret, { expiresIn: '1h' });

      return res.status(200).json(token)

    } else {
      return res.status(422).send({message: 'Wrong email or password.'})
    }

  })
}

exports.register = (req, res) => {
  let {username, email, password, passwordConfirm} = req.body

  if (!email || !password) {
    return res.status(422).send({message: 'Please provide email and password'})
  }

  User.findOne({email: email}).then((taken) => {
    if(taken) {
      return res.status(422).send({message: 'Email already taken'})
    }

    if(password !== passwordConfirm) {
      return res.status(422).send({message: 'Password and password confirmation do not match'})
    }

    bcrypt.hash(req.body.password, 10).then((result) => {
      password = result

      user = new User({
        username, email, password
      })

      user.save(function(err) {
        if (err) {
          return res.status(422).send({message: err.message})
        }
        return res.status(201).json({message: 'Successfully registered.'})
      })
    })
  })
}


exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization

  if (token) {
    const user = parseToken(token)
    //console.log(user)

    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({message: err.message})
      }

      if (user) {
        res.locals.user = user
        next()
      } else {
        return notAuthorized(res)
      }
    })
  }
  else {
    return notAuthorized(res)
  }
}

function notAuthorized(res) {
  return res.status(403).send({ message: 'Access forbidden! Please Log In.' });
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], secret)
}

