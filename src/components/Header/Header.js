import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearUser } from '../../ducks/reducer'
import './Header.css'



const Header = props => {


    const logout = () => {
        axios.get('/api/logout')
            .then(() => {
                props.clearUser()
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    
    return (
        <header>
            <h1>Welcome to Your Study</h1>

            <Link to='/profile' >
                <h2>Home</h2>
            </Link>
            <Link to='/journal' >
                <h2>My Journal</h2>
            </Link>
            <Link to='/quotes' >
                <h2>My Quotes</h2>
            </Link>
            <Link to='/notes' >
                <h2>My Notes</h2>
            </Link>
            <Link to='/about'>
                <h2>About</h2>
            </Link>
            <h2 onClick={logout}>Logout</h2>
        </header>
    )
}


const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { clearUser })(Header));