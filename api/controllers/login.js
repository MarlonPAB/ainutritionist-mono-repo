const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { email, password } = body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    email: user.email
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 7
    }
  )

  response.send({
    username: user.username,
    email: user.email,
    token
  })
})

module.exports = loginRouter
