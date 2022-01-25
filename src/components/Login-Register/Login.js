import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '..//../ducks/reducer';
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            registerView: false
        }
    };

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    //registerView in state is used to conditionally render view depending on if the user is logging in or registering
    // and this toggles this value in state
    handleToggle = () => {
        this.setState({ registerView: !this.state.registerView });
    };
    //This create a user's profile information and stores it in the database and then signs them in and displays the desk view
    // and if the passwords in both inputs are not the same, alerts the user that such is the case
    handleRegister = () => {
        const { username, email, password, verPassword } = this.state;
        if (password && password === verPassword) {
            axios.post('/api/register', { username, email, password })
                .then(res => {
                    this.props.getUser(res.data);
                    this.props.history.push('/profile');
                    alert("Congratulations, you're all registered. Have a great time in Your Study.");
                })
                .catch(err => console.log(err));
        } else {
            alert("Passwords don't match");
        }
    };
    //Logs user in if inputs are valid and gets their information and displays the desk view
    handleLogin = () => {
        const { email, password } = this.state;
        axios.post('/api/login', { email, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/profile');
            })
            .catch(err => {
                // If the values are invalid the user is alerted that such is the case
                alert('Username or Password not found, please try again');
                //If the values are invalid and need to be retried, the input fields are set empty
                this.setState({ email: '' });
                this.setState({ password: '' });
                console.log(err);
            });
    };

    render() {
        return (
            <div className='login-page'>
                <section className='authentication-info1'>
                    <div className='enter-box'>
                        <h1 className='enter'>Enter Your Study</h1>
                    </div>
                    {/* Conditionally renders the view depending on if the user wants to register and account or login */}
                    {this.state.registerView
                        ? (
                            <>
                                <h3 className='login-here-text' >Register Here</h3>
                                <input className='input-class'
                                    value={this.state.username}
                                    name='username'
                                    placeholder='Username'
                                    onChange={e => this.handleInput(e)} />
                            </>
                        ) :
                        <h3 className='login-here-text'>Login Here</h3>}
                    <input className='input-class'
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={e => this.handleInput(e)} />
                    <input className='input-class'
                        value={this.state.password}
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={e => this.handleInput(e)} />
                    {this.state.registerView
                        ? (
                            <>
                                <input className='input-class'
                                    value={this.state.verPassword}
                                    name='verPassword'
                                    type='password'
                                    placeholder='Verify Password'
                                    onChange={e => this.handleInput(e)} />
                                <button onClick={this.handleRegister}>Register</button>
                                <p>Have an account? <span onClick={this.handleToggle}>Login here</span></p>
                            </>
                        ) : (
                            <>
                                <button onClick={this.handleLogin}>Login</button>
                                <div className='register-here' >
                                    <p>Don't have an account? <span onClick={this.handleToggle}>Register here</span></p>
                                </div>
                            </>
                        )
                    }
                </section>
            </div>
        )
    }
}

export default connect(null, { getUser })(Login);