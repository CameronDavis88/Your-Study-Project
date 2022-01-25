import axios from 'axios';
import { useState } from 'react';
import './Note.css';

const Note = props => {
    const [note, setNote] = useState(props.note.note);
    //Functions below delete or update entry in database and updates the view to display the page according tot he new data
    const deleteNote = () => {
        const id = props.note.note_id;
        axios.delete(`/api/note/${id}`)
            .then(() => {
                props.getNotes();
            })
            .catch(err => console.log(err));
    };
    const updateNote = () => {
        const id = props.note.note_id;
        axios.put(`/api/note/${id}`, { note })
            .then(() => {
                alert('Note Updated');
                props.getNotes();
            })
            .catch(err => console.log(err));
    };

    return (
        //Displays the entry and changes the value as user types
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
};

export default Note;

