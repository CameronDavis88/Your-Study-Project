import axios from 'axios';
import { useState, useEffect } from 'react';
import './Entry.css';

const Entry = props => {

    const [entry, setEntry] = useState(props.entry.entry);

    const deleteEntry = () => {
        const id = props.entry.entry_id;
        axios.delete(`/api/entry/${id}`)
            .then(() => {
                props.getJournal()
            })
            .catch(err => console.log(err));
    };

    const updateEntry = () => {
        const id = props.entry.entry_id;
        axios.put(`/api/entry/${id}`, { entry })
            .then(() => {
                alert('Entry Updated')
                props.getJournal()
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
    }, []);

    return (
        <div className='entry-container'>
            <textarea
                rows='5'
                cols='100'
                value={entry}
                className='editing-text-input'
                onChange={e => setEntry(e.target.value)} />
            <div className='button-div'>
                <button onClick={updateEntry}>Update Entry</button>
                <button onClick={deleteEntry}>Delete Entry</button>
            </div>
        </div>
    )
};

export default Entry;

