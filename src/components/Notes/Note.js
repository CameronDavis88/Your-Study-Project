import axios from 'axios'
import { useState, useEffect } from 'react'
import './Note.css'

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
        axios.put(`/api/note/${id}`, { note })
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
            <textarea
                rows='5'
                cols='100'
                value={note}
                className='editing-text-input'
                onChange={e => setNote(e.target.value)} />
            <div className='button-div'>
                <button onClick={updateNote}>Update Note</button>
                <button onClick={deleteNote}>Delete Note</button>
            </div>
        </div>
    )
}
export default Note

