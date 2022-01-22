import React, { Component } from 'react';
import './About.css';

class About extends Component {
    render() {
        return (
            <div className='about-page'>
                <span className='about-title'>About Your Study</span>
                <div className='about-box'>
                <p className='about-content'>Your Study is a place to organize and store your personal notes, and journal entries, as well as some of your favorite quotes.</p>
                </div>
            </div>
        )
    }
};

export default About;
