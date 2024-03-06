import React, { useRef, useState } from 'react'
import Toggleable from './Toggleable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const toggleableRef = useRef()
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    toggleableRef.current.toggleVisibility()
  }

  return (
    <Toggleable buttonLabel='New Note' ref={toggleableRef}>
      <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder='Write the note content'
          value={newNote}
          onChange={handleChange}
        />
        <button type='submit'>save</button>
      </form>

      <div>
        <button onClick={handleLogout}> Log Out</button>
      </div>
    </Toggleable>
  )
}
