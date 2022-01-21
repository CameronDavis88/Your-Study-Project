import React from 'react'
import {Switch, Route} from 'react-router-dom'
import About from './components/About/About'
import Login from './components/Login-Register/Login'
import Journal from './components/Journal/Journal'
import Notes from './components/Notes/Notes'
import Profile from './components/Profile/Profile'
import Quotes from './components/Quotes/Quotes'

export default (
    //Linking the components views to their respective paths
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/journal' component={Journal}/>
        <Route path='/notes' component={Notes}/>
        <Route path='/quotes' component={Quotes}/>
        <Route path='/about' component={About}/>
    </Switch>
)