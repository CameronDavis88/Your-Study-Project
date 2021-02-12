import axios from 'axios'
import Note from './Note'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import './Notes.css'

const Notes = props => {
    const [notes, setNotes] = useState([])
    const [note, setNote] = useState('')
    const [addView, setAddView] = useState(false)

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
                addViewFalse()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getNotes()
    }, [])

    const addViewTrue = () => {
        setAddView(true)
    }

    const addViewFalse = () => {
        setAddView(false)
    }

    const mappedNotes = notes.map(note => {
        return <Note
            key={note.note_id}
            note={note}
            getNotes={getNotes}
            className='note'
        />
    })

    return (

        <div className='notes-page'>
            <section className='content'>
                {addView
                    ? (
                        <>
                            <div className='note-input-box'>
                                <div className='title-box' >
                                <h2 className='notes-title'>New Note</h2>
                                </div>
                                <button onClick={addViewFalse}>Return to Notes</button>
                                <input type='text' className='note-input-text' value={note}
                                    onChange={e => setNote(e.target.value)} />
                                <button onClick={createNote} >Add Note</button>
                            </div>
                        </>
                    )
                    :
                    <main>
                        <div className='title-box' >
                        <h2 className='notes-title'>Your Notes</h2>
                        </div>
                        <button className='add-view' onClick={addViewTrue}>Add New Note</button>
                        {mappedNotes}
                    </main>
                }
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Notes);












// const Notes = props => {
//     const [notes, setNotes] = useState([])
//     const [note, setNote] = useState('')

// const getNotes = () => {
//     const id = props.user.user_id
//     axios.get(`/api/notes/${id}`)
//         .then(res => {
//             setNotes(res.data)
//         })
//         .catch(err => console.log(err))
// }

//     const createNote = () => {
//         const id = props.user.user_id
//         axios.post(`/api/note/${id}`, { note })
//             .then(() => {
//                 setNote('')
//                 getNotes()
//             })
//             .catch(err => console.log(err))
//     }

//     useEffect(() => {
//         getNotes()
//     }, [])

//     const mappedNotes = notes.map( note => {
//         return <Note
//             key={note.note_id}
//             note={note}
//             getNotes={getNotes}
//             className='note'
//         />
//     })

//     return (

//         <div className='notes-page'>
//             <header>Your Notes</header>
//             <div className='note-input-box'>
//                 <input className='note-input-text' value={note}
//                     onChange={e => setNote(e.target.value)} />
//                 <button onClick={createNote}>Add Note</button>
//             </div>
//             {mappedNotes}
//         </div>
//     )
// }
// const mapStateToProps = reduxState => reduxState;

// export default connect(mapStateToProps, { getUser })(Notes)
