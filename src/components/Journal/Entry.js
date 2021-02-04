import axios from 'axios'
import { useState, useEffect } from 'react'



const Entry = props => {

    const [entry, setEntry] = useState(props.entry.entry)

    const deleteEntry = () => {
        const id = props.entry.entry_id
        axios.delete(`/api/entry/${id}`)
        .then(res=>{
            setEntry(res.data)
        })
    }

    const updateEntry = () => {
        const id = props.entry.entry_id
        axios.put(`/api/entry/${id}`, { entry })
            .then(res => {
                console.log(res.data.entry)
                setEntry(res.data.entry)
                alert('Entry Updated')
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        props.getJournal()
    }, [updateEntry, deleteEntry])

    return (
        <div className='entry-container'>
            {/* <p className='text-box'>{props.entry.entry}</p> */}
            <input value={entry} className='editing-text' onChange={e => setEntry(e.target.value)} />
            <button onClick={updateEntry}>Update Entry</button>
            <button onClick={deleteEntry}>Delete Entry</button>
            <div className='editing-box'>
                {/* make this input box be conditionally rendered  */}
                {/* <input value={text} className='editing-text'/> */}
            </div>
        </div>
    )
}
export default Entry

// make methods with axios requests for edit/submit, and delete, 