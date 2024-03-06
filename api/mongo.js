const mongoose = require('mongoose')
// const password = require('./password.js')

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database Connected')
  }).catch(err => {
    console.error(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
