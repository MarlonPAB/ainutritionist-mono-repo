const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')

const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('userId', {
    username: 1,
    email: 1
  }
  )
  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })

  // const note=notes.find(note=>note.id===id)
})

// These routes need user tokens to access:

notesRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
    response.json(result)
  })
})

notesRouter.delete('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  }).catch(error => { next(error) })
})
notesRouter.post('/', userExtractor, async (request, response, next) => {
  const {
    content,
    important = false
  } = request.body

  // sacar userId de request
  const { userId } = request
  const user = await User.findById(userId)

  if (!request.body || !content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    userId: user._id
  })

  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    // saves the info added:
    await user.save()

    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
