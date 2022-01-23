import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import './Profile.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        const { password } = this.props.user;

        this.state = {
            username: '',
            email: '',
            password: password,
            verPassword: '',
            editingView: false

        };
    };

    loggedinView = () => {
        if (!this.props.user.user_id) {
            this.props.history.push('/');
        };
    };

    componentDidMount() {
        this.loggedinView();
        getUser();
    };

    editView = () => {
        this.setState({ editingView: true });
    };

    homeView = () => {
        this.setState({ editingView: false });
    };

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    editUsername = () => {
        const id = this.props.user.user_id;
        const username = this.state.username;
        axios.put(`/api/user/${id}`, { username })
            .then(res => {
                this.setState({ username: res.data.username });
                alert('Username Updated');
            })
            .catch(err => console.log(err));
    };

    editPassword = () => {
        const id = this.props.user.user_id;
        const { password, verPassword } = this.state;

        if (password && password === verPassword) {
            axios.put(`/api/user_password/${id}`, { password })
                .then(res => {
                    this.setState({ password: res.data.password });
                    alert('Password Updated');
                })
                .catch(err => console.log(err));
        } else {
            alert("Passwords don't match");
        };
    };

    editEmail = () => {
        const id = this.props.user.user_id;
        const email = this.state.email;
        axios.put(`/api/user_email/${id}`, { email })
            .then(res => {
                this.setState({ email: res.data.email });
                alert('Email Updated');
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className='home-page'>
                <section className='authentication-info'>
                    {this.state.editingView
                        ? (
                            <>
                                <h3 className='update-title'>Update Your Info</h3>
                                <section className='updating-box'>

                                    <div className='update-username-box'>
                                        <input
                                            className='inputs'
                                            value={this.state.username}
                                            name='username'
                                            placeholder='Username'
                                            onChange={e => this.handleInput(e)} />
                                        <button onClick={this.editUsername}>Update</button>
                                    </div>
                                    <div className='update-username-box'>
                                        <input className='inputs'
                                            value={this.state.email}
                                            name='email'
                                            placeholder='Email'
                                            onChange={e => this.handleInput(e)} />
                                        <button onClick={this.editEmail}>Update</button>
                                    </div>
                                    <input
                                        value={this.state.password}
                                        className='inputs'
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        onChange={e => this.handleInput(e)} />
                                    <button onClick={this.editPassword}>Update</button>
                                    <h1></h1>
                                    <input
                                        value={this.state.verPassword}
                                        className='inputs'
                                        name='verPassword'
                                        type='password'
                                        placeholder='Verify Password'
                                        onChange={e => this.handleInput(e)} />
                                </section>
                                <button onClick={this.homeView} className='finished'>Finished Updating</button>
                            </>
                        ) : (
                            <div className='profile-display'>
                                <div className='user-update'>
                                    <div className='title-box' >
                                        <h2 className='username'>Welcome to Your Desk</h2>
                                    </div>
                                    <div className='title-box' >
                                        <h3 onClick={this.editView} className='update'>Update You Profile</h3>
                                    </div>
                                </div>
                                <div className='link-box'>
                                    <h2 className='notes' onClick={() => this.props.history.push('/notes')} >Notes</h2>
                                    <h2 className='journal' onClick={() => this.props.history.push('/journal')}>Journal</h2>
                                    <h2 className='quotes' onClick={() => this.props.history.push('/quotes')}>Quotes</h2>
                                </div>
                            </div>
                        )
                    }
                </section>
            </div>
        )
    }
};

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { getUser })(Profile));

