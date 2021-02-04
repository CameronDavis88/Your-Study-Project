// import Quote from './Quote'
import './Quotes.css'

const Quotes = props => {
    return(
        // map over the posts rendering the individual post component 
        <div>
        <header>Quotes</header>
        {/* <Quote/> */}
        </div>
    )
}
 export default Quotes

 //  not sure if it should be the journal or the entry component (or notes-note, or quotes-quote respectively): but there will be either a rendering of a mapping of the individual one or the rendering of the individual comp which maps over the individual entries--- the individual entries are straight from what is returned by the sql query of journal which sends id etc AND the "entry" which is an individual entry. so it would render db.journal.entry