import axios from 'axios'
import { useState, useEffect } from 'react'

const Note = props => {

    const [note, setNote] = useState(props.note.note)

    const deleteNote = () => {
        const id = props.note.note_id
        axios.delete(`/api/note/${id}`)
            .then(() => {
                props.getNotes()
            })
            .catch(err => console.log(err))
    }

    const updateNote = () => {
        const id = props.note.note_id
        axios.put(`/api/note/${id}`, {note})
            .then(() => {
                alert('Note Updated')
                props.getNotes()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
    }, [])

    return (
        <div className='note-container'>
            <input value={note} className='editing-note-input'
                onChange={e => setNote(e.target.value)} />
            <button onClick={updateNote}>Update Note</button>
            <button onClick={deleteNote}>Delete Note</button>

        </div>
    )
}
export default Note

