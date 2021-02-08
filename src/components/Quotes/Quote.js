import axios from 'axios'
import { useState, useEffect } from 'react'

const Quote = props => {

    const [quote, setQuote] = useState(props.quote.quote)

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
            <input value={quote} className='editing-quote-input' 
            onChange={e => setQuote(e.target.value)} />
            <button onClick={updateQuote}>Update Quote</button>
            <button onClick={deleteQuote}>Delete Quote</button>
        </div>
    )
}
export default Quote

 