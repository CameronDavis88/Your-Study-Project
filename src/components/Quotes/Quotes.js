import axios from 'axios';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../ducks/reducer';
import Quote from './Quote';
import './Quotes.css';

const Quotes = props => {
    //React hooks
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState('');
    const [addView, setAddView] = useState(false);
    //Fetches the user's quotes stored in database
    const getQuotes = () => {
        const id = props.user.user_id;
        axios.get(`/api/quotes/${id}`)
            .then(res => {
                setQuotes(res.data);
            })
            .catch(err => console.log(err));
    };
    //Creates an entry
    const createQuote = () => {
        const id = props.user.user_id;
        axios.post(`/api/quote/${id}`, { quote })
            .then(() => {
                setQuote('');
                getQuotes();
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
        getQuotes();
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
    const mappedQuotes = quotes.map(quote => {
        return <Quote
            key={quote.quote_id}
            quote={quote}
            getQuotes={getQuotes}
            className='quote'
        />
    });

    return (

        <div className='quotes-page'>
            <section className='content'>
            {/* Conditionally render the view depending on if the user is creating an entry or viewing/editing old entries */}
                {addView
                    ? (
                        <>
                            <div className='quote-input-box'>
                                <div className='title-box' >
                                    <h2 className='quotes-title'>New Note</h2>
                                </div>
                                <button onClick={addViewFalse}>Return to Quotes</button>
                                <textarea
                                    rows='5'
                                    cols='100'
                                    type='text'
                                    className='quote-input-text'
                                    value={quote}
                                    onChange={e => setQuote(e.target.value)} />
                                <button onClick={createQuote} >Add Quote</button>
                            </div>
                        </>
                    ) : (
                        <main>
                            <div className='title-box' >
                                <h2 className='quotes-title'>Your Quotes</h2>
                            </div>
                            <button className='add-view' onClick={() => props.history.push('/profile')}>Back to Desk</button>
                            <button className='add-view' onClick={addViewTrue}>Add New Quote</button>
                            {mappedQuotes}
                        </main>
                    )
                }
            </section>
        </div>
    )
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Quotes);




