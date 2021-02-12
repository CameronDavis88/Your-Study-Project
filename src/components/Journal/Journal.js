import axios from 'axios'
import Entry from './Entry'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import './Journal.css'
// import '../../styles/Journal.css'



const Journal = props => {
    const [journal, setJournal] = useState([])
    const [entry, setEntry] = useState('')
    const [addView, setAddView] = useState(false)


    const getJournal = () => {
        const id = props.user.user_id
        axios.get(`/api/journal/${id}`)
            .then(res => {
                setJournal(res.data)
            })
            .catch(err => console.log(err))
    }

    const createEntry = () => {
        const id = props.user.user_id
        axios.post(`/api/entry/${id}`, { entry })
            .then(() => {
                setEntry('')
                getJournal()
                // alert('Added Newest Entry')
                addViewFalse()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getJournal()
    }, [])

    const addViewTrue = () => {
        setAddView(true)
    }

    const addViewFalse = () => {
        setAddView(false)
    }



    const mappedJournal = journal.map(entry => {
        return <Entry
            key={entry.entry_id}
            entry={entry}
            getJournal={getJournal}
            className='entry'
        />
    })

    return (

        <div className='journal-page'>
            <section className='content'>
                {addView
                    ? (
                        <>
                            <div className='entry-input-box'>
                                <div className='title-box' >
                                <h2 className='journal-title'>New Entry</h2>
                                </div>
                                <button onClick={addViewFalse}>Return to Journal</button>
                                <input type='text' className='entry-input-text' value={entry}
                                    onChange={e => setEntry(e.target.value)} />
                                <button onClick={createEntry} >Add Entry</button>
                            </div>
                        </>
                    )
                    :
                    <main>
                        <div className='title-box' >
                        <h2 className='journal-title'>Your Journal</h2>
                        </div>
                        <button className='add-view' onClick={addViewTrue}>Add New Entry</button>
                        {mappedJournal}
                    </main>
                }
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Journal);

