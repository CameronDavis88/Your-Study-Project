import axios from 'axios';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../../ducks/reducer';
import './Header.css';

const Header = props => {
    const location = useLocation();
    const atAbout = props.history.pathname = `/about`;
    //Loges the user out and clears and sends them to the homepage view.
    const logout = () => {
        axios.get('/api/logout')
            .then(() => {
                props.clearUser();
                props.history.push('/');
            })
            .catch(err => console.log(err))
    };

    return (
        <header className='header-box'>
            <h1>Your Study</h1>
            {/* Conditionally rendering the Header so to only display the Logout button if the user is signed in and so 
            as not not display buttons to the current view */}
            {!props.user.user_id
                ? (
                    <>
                        {location.pathname === atAbout
                            ? (
                                <h2 onClick={() => props.history.push('/')} className='un-header-links' >Home</h2>
                            ) : (
                                <h2 onClick={() => props.history.push('/about')} className='un-header-links' >About</h2>
                            )}
                    </>
                ) : (
                    <>
                        {location.pathname === atAbout
                            ? (
                                <div className='header-links'>
                                    <h2 onClick={() => props.history.push('/profile')}>Your Desk</h2>
                                    <h2 className='logout' onClick={logout}>Logout</h2>
                                </div >
                            ) : (
                                <div className='header-links'>
                                    <h2 onClick={() => props.history.push('/about')}>About</h2>
                                    <h2 className='logout' onClick={logout}>Logout</h2>
                                </div >
                            )
                        }
                    </>
                )}
        </header>
    )
};
const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { clearUser })(Header));