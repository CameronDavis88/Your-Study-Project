import axios from 'axios';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../../ducks/reducer';
import './Header.css';

const Header = props => {
    const location = useLocation();
    const atAbout = props.history.pathname=`/about`;

    const logout = () => {
        axios.get('/api/logout')
            .then(() => {
                props.clearUser();
                props.history.push('/');
            })
            .catch(err => console.log(err))
    };

    const toDesk = () => {
        props.history.push('/profile');
    };

    const toAbout = () => {
        props.history.push('/about');
    };

    const toHome = () => {
        props.history.push('/');
    };

  return (
        <header className='header-box'>
            <h1>Your Study</h1>
            {!props.user.user_id 
            ? (
                <>
                {location.pathname === atAbout 
                ? (
                    <div className='un-header-links'>
                        <h2 onClick={toHome}>Home</h2>
                    </div>
                 ) : (
                    <div className='un-header-links'>
                        <h2 onClick={toAbout}>About</h2>
                    </div> 
                    )}  
                </>
             ) : (
                <>
                {location.pathname === atAbout
                 ? (
                    <div className='header-links'> 
                        <h2  onClick={toDesk}>Your Desk</h2>
                        <h2 className='logout' onClick={logout}>Logout</h2>
                    </div >
                  ) : (
                    <div className='header-links'> 
                        <h2 onClick={toAbout}>About</h2>
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