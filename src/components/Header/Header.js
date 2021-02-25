import axios from 'axios'
import { withRouter } from 'react-router-dom'
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

    const toDesk = () => {
        props.history.push('/profile')
    }

    const toAbout = () => {
        props.history.push('/about')
    }

    const toHome = () => {
        props.history.push('/')
    }

    return (
        <header className='header-box'>
            <h1>Your Study</h1>
            {props.user.user_id
                ?
                <>
                    <h2 onClick={toDesk}>Your Desk</h2>
                    <h2 className='logout' onClick={logout}>Logout</h2>
                </>
                :
                <>
                    <h2 onClick={toAbout}>About</h2>
                    <h2 onClick={toHome}>Home</h2>
                </>
            }
        </header>
    )
}


const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { clearUser })(Header));