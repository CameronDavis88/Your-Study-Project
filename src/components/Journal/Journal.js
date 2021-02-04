import axios from 'axios'
import Entry from './Entry'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import './Journal.css'


const Journal = props => {

    const [text, setText] = useState('')
  
    const [journal, setJournal] = useState([])

   

    const getJournal = () => {
        getUser()
        const  id = props.user.user_id
        axios.get(`/api/journal/${id}`)
            .then(res => {
                setJournal(res.data)
            })
            .catch(err => console.log(err))
    }


    const createEntry = () => {
        getUser()
        const  id = props.user.user_id
        axios.post(`/api/entry/${id}`, {text})
        
            .then((res) => {
                setJournal(res.data)
                setText('')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getJournal()
    }, [])

  


    const mappedJournal = journal.map((entry) => {
        getUser()
    
        return <Entry 
        key={entry.entry_id}
        entry={entry}
        getJournal={getJournal}
        />
        
    })

    return (
        
        <div className='journal-page'>
            <header>Your Journal</header>
            <div className='input-box'>
            <input className='input-text' value={text} onChange={e => setText(e.target.value)} />
            <button onClick={createEntry}>Add Entry</button>
            {/* try to make it so they see a button 'add entry' which after clicking it conditionally displays the input-box --see the conditonal redering of login vs register*/}
            </div>
            {mappedJournal}
            
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Journal);

 