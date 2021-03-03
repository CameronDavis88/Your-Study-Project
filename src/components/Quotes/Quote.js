import axios from 'axios'
import { useState, useEffect } from 'react'
import './Quote.css'

const Quote = props => {

    const [quote, setQuote] = useState(props.quote.quote)
    // const [addView, setAddView] = useState(false)

    const deleteQuote = () => {
        const id = props.quote.quote_id
        axios.delete(`/api/quote/${id}`)
            .then(() => {
                props.getQuotes()
            })
            .catch(err => console.log(err))
    }

    const updateQuote = () => {
        const id = props.quote.quote_id
        axios.put(`/api/quote/${id}`, { quote })
            .then(() => {
                alert('Quote Updated')
                props.getQuotes()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
    }, [])

    return (
        <div className='quote-container'>
            <textarea
                rows='5'
                cols='100'
                value={quote}
                className='editing-text-input'
                onChange={e => setQuote(e.target.value)} />
            <div className='button-div'>
                <button onClick={updateQuote}>Update Quote</button>
                <button onClick={deleteQuote}>Delete Quote</button>
            </div>
        </div>
    )
}
export default Quote
