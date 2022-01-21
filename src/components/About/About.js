import React, { Component } from 'react';
// import '../../styles/About'
import './About.css';

class About extends Component {
    render() {
        return (
            <div className='about-page'>
                <span className='about-title'>About Your Study</span>
                <main about-box>
                <p className='about-content'>Your Study is a place to organize and store your personal note and journal entries, as well as some of your favorite quotes.</p>
                </main>
            </div>
        )
    }
}

export default About;
