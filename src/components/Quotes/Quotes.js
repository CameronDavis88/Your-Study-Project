import axios from 'axios';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../ducks/reducer';
import Quote from './Quote';
import './Quotes.css';

const Quotes = props => {
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState('');
    const [addView, setAddView] = useState(false);

    const getQuotes = () => {
        const id = props.user.user_id;
        axios.get(`/api/quotes/${id}`)
            .then(res => {
                setQuotes(res.data);
            })
            .catch(err => console.log(err));
    };

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

    const loggedinView = () => {
        if (!props.user.user_id) {
            props.history.push('/');
        };
    };

    useEffect(() => {
        loggedinView();
        getQuotes();
    }, []);

    const addViewTrue = () => {
        setAddView(true);
    };

    const addViewFalse = () => {
        setAddView(false);
    };

    const mappedQuotes = quotes.map(quote => {
        return <Quote
            key={quote.quote_id}
            quote={quote}
            getQuotes={getQuotes}
            className='quote'
        />
        }
    );

    return (

        <div className='quotes-page'>
            <section className='content'>
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




