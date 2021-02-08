import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import './Profile.css'





class Profile extends Component {
    constructor(props) {
        super(props)

        const { username, email, profilePic } = this.props.user
        this.state = {
            username: username,
            email: email,
            profilePic: profilePic,
            // password: '',
            // verPassword: '',
            editingView: false

        }
    }


    componentDidMount() {
        getUser()
    }

    editView = () => {
        this.setState({ editingView: true })
    }
    homeView = () => {
        this.setState({ editingView: false })
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    editUsername = () => {
        const id = this.props.user.user_id
        const username = this.state.username
        axios.put(`/api/user/${id}`, { username })
            .then(res => {
                this.setState({ username: res.data.username })
                alert('Username Updated')
            })
            .catch(err => console.log(err));
    }

    editEmail = () => {
        const id = this.props.user.user_id
        const email = this.state.email
        axios.put(`/api/user/${id}`, { email })
            .then(res => {
                this.setState({ email: res.data.email })
                alert('Email Updated')
            })
            .catch(err => console.log(err));
    }

    editProfilePic = () => {
        const id = this.props.user.user_id
        const profilePic = this.state.profilePic
        axios.put(`/api/user/${id}`, { profilePic })
            .then(res => {
               
                this.setState({ profilePic: res.data.profilePic })
                alert('Profile Picture Updated')
            })
            .catch(err => console.log(err), alert('Profile data unreadable'));
    }

    // editPassword = () => {
    //     const id = this.props.user.user_id
    //     const password = this.state.password
    //     axios.put(`/api/user/${id}`, { password })
    //         .then(res => {
                
    //             this.setState({ password: res.data.password })
    //             alert('Password Updated')
    //         })
    //         .catch(err => console.log(err));
    // }



    // this will be the big function that fires the other fuctions I think or will just be altered into the one that verifies the password before editing it, then maybe make a sepapate button that takes you back to nonediting mode.

    // handleRegister = () => {
    //     const { password, verPassword } = this.state

    //     if (password && password === verPassword) {
    //         axios.post('/api/user/${id}', { password })
    //             .then(res => {
    //                 this.props.getUser(res.data)
    //                this.setState({password: password})
    //             })
    //             .catch(err => console.log(err))
    //     } else {
    //         alert("Passwords don't match")
    //     }
    // }


    render() {
        return (
            <div>
                <section className='authentication-info'>
                    {this.state.editingView
                        ? (
                            <>
                                <h3>Update Your Info</h3>
                                <input
                                    value={this.state.username}
                                    name='username'
                                    placeholder='Username'
                                    onChange={e => this.handleInput(e)} />
                                <button onClick={this.editUsername}>Update Username</button>

                                <input
                                    value={this.state.email}
                                    name='email'
                                    placeholder='Email'
                                    onChange={e => this.handleInput(e)} />
                                <button onClick={this.editEmail}>Update Email</button>

                                <input
                                    value={this.state.profilePicture}
                                    name='profilePicture'
                                    placeholder='Profile Picture URL'
                                    onChange={e => this.handleInput(e)} />
                                <button onClick={this.editProfilePic}>Update Profile Picture</button>

                                {/* <input
                                    value={this.state.password}
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    onChange={e => this.handleInput(e)} />
                                <input
                                    value={this.state.verPassword}
                                    name='verPassword'
                                    type='password'
                                    placeholder='Verify Password'
                                    onChange={e => this.handleInput(e)} />
                                <button onClick={this.editPassword}>Update Password</button> */}
                                <button onClick={this.homeView} >Finished Updating</button>
                            </>
                        )
                        : <div>
                            <img src={this.state.profilePic} alt='Profile-Picture' />
                            <h2>Email: {this.state.email}</h2>
                            <h2>Username: {this.state.username}</h2>
                            <div >
                                <h3 onClick={this.editView}>Update Your Info</h3>
                            </div>
                        </div>

                    }
                </section>
            </div>
        )
    }
}





const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Profile);

