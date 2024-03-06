require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

// models:
// const Note = require('./models/Note')

// middlewares:
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(express.static('../app/build'))

app.use(logger)

app.use('/api/notes', notesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
