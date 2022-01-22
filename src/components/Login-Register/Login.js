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
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleToggle = () => {
        this.setState({ registerView: !this.state.registerView });
    };

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

    handleLogin = () => {
        const { email, password } = this.state;

        axios.post('/api/login', { email, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/profile');
            })
            .catch(err =>
                alert('Username or Password not found, please try again'),
                this.setState({ email: '' }),
                this.setState({ password: '' })
            );
    };


    render() {
        return (
            <div className='login-page'>
                <section className='authentication-info1'>
                    <div className='enter-box'>
                        <h1 className='enter'>Enter Your Study</h1>
                    </div>
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
                                <p>Don't have an account? <span onClick={this.handleToggle}>Register here</span></p>
                            </>
                        )
                    }
                </section>
            </div>
        )
    }
}

export default connect(null, { getUser })(Login);