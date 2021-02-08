import axios from 'axios'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import Quote from './Quote'
import './Quotes.css'

const Quotes = props => {

    const [quotes, setQuotes] = useState([])
    const [quote, setQuote] = useState('')

    const getQuotes = () => {
        const id = props.user.user_id
        axios.get(`/api/quotes/${id}`)
            .then(res => {
                setQuotes(res.data)
            })
            .catch(err => console.log(err))
    }

    const createQuote = () => {
        const id = props.user.user_id
        axios.post(`/api/quote/${id}`, { quote })
            .then(() => {
                setQuote('')
                getQuotes()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getQuotes()
    }, [])

    const mappedQuotes = quotes.map(quote => {
        return <Quote
            key={quote.quote_id}
            quote={quote}
            getQuotes={getQuotes}
        />
    })

    return(
        
        <div className='quotes-page'>
        <header>Your Favorite Quotes</header>
        <div className='quote-input-box'>
                <input className='quote-input-text' value={quote}
                    onChange={e => setQuote(e.target.value)} />
                <button onClick={createQuote}>Add Entry</button>
            </div>
            {mappedQuotes}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Quotes);

 