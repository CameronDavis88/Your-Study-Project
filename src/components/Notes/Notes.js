import axios from 'axios'
import Note from './Note'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import './Notes.css'
// import '../../styles/Notes.css'

const Notes = props => {
    const [notes, setNotes] = useState([])
    const [note, setNote] = useState('')

const getNotes = () => {
    const id = props.user.user_id
    axios.get(`/api/notes/${id}`)
        .then(res => {
            setNotes(res.data)
        })
        .catch(err => console.log(err))
}

    const createNote = () => {
        const id = props.user.user_id
        axios.post(`/api/note/${id}`, { note })
            .then(() => {
                setNote('')
                getNotes()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getNotes()
    }, [])

    const mappedNotes = notes.map( note => {
        return <Note
            key={note.note_id}
            note={note}
            getNotes={getNotes}
            className='note'
        />
    })

    return (

        <div className='notes-page'>
            <header>Your Notes</header>
            <div className='note-input-box'>
                <input className='note-input-text' value={note}
                    onChange={e => setNote(e.target.value)} />
                <button onClick={createNote}>Add Note</button>
            </div>
            {mappedNotes}
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Notes)
