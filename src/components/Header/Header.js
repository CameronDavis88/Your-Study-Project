import axios from 'axios'
// import React, { userState, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearUser } from '../../ducks/reducer'
import './Header.css'

const Header = props => {

    // const [deskView, setDeskView] = useState(false)

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
    console.log(props.location.pathname)


    // const inDeskView = () => {

    //     if (props.location.pathname = '/profile') {
    //         return setDeskView(true)
    //     }else {
    //         return setDeskView(false)
    //     }


    // }

    // useEffect(() => {
    //     inDeskView()
    // }, [])

    return (
        <header className='header-box'>
            <h1>Your Study</h1>
            {!props.user.user_id
                ?
                // <>
                //     {deskView
                //         ?
                //         <>
                //             <h2 onClick={toAbout}>About</h2>
                //             <h2 className='logout' onClick={logout}>Logout</h2>
                //         </>
                //         :
                <>
                <div className='un-header-links'>
                    <h2  onClick={toAbout}>About</h2>
                    <h2  onClick={toHome}>Home</h2>
                    </div>

                </>
                //     }
                // </>
                :
                <>
                <div className='header-links'> 
                    <h2  onClick={toDesk}>Your Desk</h2>
                    <h2 onClick={toAbout}>About</h2>
                    <h2 className='logout' onClick={logout}>Logout</h2>
                    </div >
                </>
            }
        </header>
    )
}


const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { clearUser })(Header));