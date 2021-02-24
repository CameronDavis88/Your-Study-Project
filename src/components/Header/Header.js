import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearUser } from '../../ducks/reducer'
import { useState, useEffect } from 'react'
import { getUser } from '../../ducks/reducer'
import './Header.css'

const Header = props => {

    const [loggedinView, setLoggedinView] = useState(false)

    const logout = () => {
        axios.get('/api/logout')
            .then(() => {
                props.clearUser()
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }
    console.log(props.user.user_id)

    const ifLoggedin = () => {
        if (props.user.user_id){
            setLoggedinView(true)
        }
    }

    useEffect(() => {
        ifLoggedin()
    }, [])

    return (
        <header className='header-box'>
            <h1>Your Study</h1>
            {loggedinView
                ?
                <>
                    <Link to='/profile' >
                        <h2>Your Desk</h2>
                    </Link>
                    <Link to='/'>
                        <h2 className='logout' onClick={logout}>Logout</h2>
                    </Link>
                </>
                :
                <> <Link to='/about'>
                    <h2>About</h2>
                </Link>
                    <Link to='/'>
                        <h2>Home</h2>
                    </Link>
                </>
            }      
        </header>
    )
}


const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { getUser, clearUser })(Header));