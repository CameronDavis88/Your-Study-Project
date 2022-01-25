import axios from 'axios';
import Note from './Note';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../ducks/reducer';
import './Notes.css';

const Notes = props => {
    //React hooks
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');
    const [addView, setAddView] = useState(false);
    //Fetches the user's notes stored in database
    const getNotes = () => {
        const id = props.user.user_id;
        axios.get(`/api/notes/${id}`)
            .then(res => {
                setNotes(res.data);
            })
            .catch(err => console.log(err));
    };
    //Creates an entry
    const createNote = () => {
        const id = props.user.user_id;
        axios.post(`/api/note/${id}`, { note })
            .then(() => {
                setNote('');
                getNotes();
                addViewFalse();
            })
            .catch(err => console.log(err));
    };
    //Upon mounting if the user is not signed in they are sent back to login-register view 
    // or if if the user is signed in their information is fetched 
    useEffect(() => {
        if (!props.user.user_id) {
            props.history.push('/');
        };
        getNotes();
    }, []);
    //Functions changing addView variable in hook which is used as the condition to conditionally
    // render the view depending on if the user is creating an entry or viewing/editing old entries
    const addViewTrue = () => {
        setAddView(true);
    };
    const addViewFalse = () => {
        setAddView(false);
    };
    //Mapping through the array of the user's individual entries and their individual data
    const mappedNotes = notes.map(note => {
        return <Note
            key={note.note_id}
            note={note}
            getNotes={getNotes}
            className='note'
        />
    });

    return (
        <div className='notes-page'>
            <section className='content'>
                 {/* Conditionally render the view depending on if the user is creating an entry or viewing/editing old entries */}
                {addView
                    ? (
                        <div className='note-input-box'>
                            <div className='title-box' >
                                <h2 className='notes-title'>New Note</h2>
                            </div>
                            <button onClick={addViewFalse}>Return to Notes</button>
                            <textarea
                                rows='5'
                                cols='100'
                                type='text'
                                className='note-input-text'
                                value={note}
                                onChange={e => setNote(e.target.value)} />
                            <button onClick={createNote} >Add Note</button>
                        </div>
                    ) : (
                        <main>
                            <div className='title-box' >
                                <h2 className='notes-title'>Your Notes</h2>

                            </div>
                            <button className='add-view' onClick={() => props.history.push('/profile')}>Back to Desk</button>
                            <button className='add-view' onClick={addViewTrue}>Add New Note</button>
                            {mappedNotes}
                        </main>
                    )
                }
            </section>
        </div>
    )
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Notes);
