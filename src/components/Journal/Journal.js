import axios from 'axios';
import Entry from './Entry';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../ducks/reducer';
import './Journal.css';

const Journal = props => {
    //React hooks
    const [journal, setJournal] = useState([]);
    const [entry, setEntry] = useState('');
    const [addView, setAddView] = useState(false);
    //Fetches the user's journal entries stored in database
    const getJournal = () => {
        const id = props.user.user_id;
        axios.get(`/api/journal/${id}`)
            .then(res => {
                setJournal(res.data);
            })
            .catch(err => console.log(err));
    };
    //Creates an entry
    const createEntry = () => {
        const id = props.user.user_id;
        axios.post(`/api/entry/${id}`, { entry })
            .then(() => {
                setEntry('');
                getJournal();
                addViewFalse();
            })
            .catch(err => console.log(err));
    };
    //Upon mounting if the user is not signed in they are sent back to login-register view 
    // or if if the user is signed in their information is fetched 
    useEffect(() => {
        if (!props.user.user_id) {
            props.history.push('/')
        };
        getJournal();
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
    const mappedJournal = journal.map(entry => {
        return <Entry
            key={entry.entry_id}
            entry={entry}
            getJournal={getJournal}
            className='entry'
        />
    });

    return (
        <div className='journal-page'>
            <section className='content'>
                {/* Conditionally render the view depending on if the user is creating an entry or viewing/editing old entries */}
                {addView
                    ? (
                        <div className='entry-input-box'>
                            <div className='title-box' >
                                <h2 className='journal-title'>New Entry</h2>
                            </div>
                            <button onClick={addViewFalse}>Return to Journal</button>
                            <textarea
                                rows='5'
                                cols='100'
                                className='entry-input-text'
                                value={entry}
                                onChange={e => setEntry(e.target.value)} />
                            <button onClick={createEntry} >Add Entry</button>
                        </div>
                    ) : (
                        <main>
                            <div className='title-box' >
                                <h2 className='journal-title'>Your Journal</h2>
                            </div>
                            <button className='add-view' onClick={() => props.history.push('/profile')}>Back to Desk</button>
                            <button className='add-view' onClick={addViewTrue}>Add New Entry</button>
                            {mappedJournal}
                        </main>
                    )
                }
            </section>
        </div>
    )
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Journal);

