import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearUser } from '../../ducks/reducer'
import './Header.css'
// import '../../styles/Header.css'



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
        <header className='header-box'>
            <h1>Your Study</h1>
            <Link to='/profile' >
                <h2>Your Desk</h2>
            </Link>
           
            <Link to='/about'>
                <h2>About</h2>
            </Link>
            <Link to='/'>
            <h2 className='logout' onClick={logout}>Logout</h2>
            </Link>
        </header>
    )
}


const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { clearUser })(Header));