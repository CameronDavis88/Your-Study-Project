import { Component } from 'react'
import axios from 'axios'
import './Profile.css'





class Profile extends Component {
        constructor(props){
            super(props)

            this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            profilePicture: '',
            registerView: false
        }
        }

        handleInput = (event) => {
            this.setState({ [event.target.name]: event.target.value })
        }

        editUserame = (id, username) => {
            let body = {username: username};
        
            axios.put(`/api/user/${id}`, body)
              .then(res => {
                this.setState({newUsername: res.body});
              })
              .catch(err => console.log(err));
          }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}





export default Profile

// later turn all this into a functional component and use hooks etc

// const Profile = props => {


//     return(
//         <header>Profile</header>
//     )
// }
