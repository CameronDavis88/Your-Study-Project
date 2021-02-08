import axios from 'axios'
import Entry from './Entry'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import './Journal.css'


const Journal = props => {
    const [journal, setJournal] = useState([])
    const [entry, setEntry] = useState('')

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
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getJournal()
    }, [])


    const mappedJournal = journal.map(entry => {
        return <Entry
            key={entry.entry_id}
            entry={entry}
            getJournal={getJournal}
        />
    })

    return (

        <div className='journal-page'>
            <header>Your Journal</header>
            <div className='entry-input-box'>
                <input className='entry-input-text' value={entry}
                    onChange={e => setEntry(e.target.value)} />
                <button onClick={createEntry}>Add Entry</button>
            </div>
            {mappedJournal}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Journal);

