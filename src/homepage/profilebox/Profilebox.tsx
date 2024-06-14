"use client";
import React, { useState } from 'react';
import './profilebox.css';
import headshot from '../../assets/headshot.webp';
import github from '../../assets/githubicon.webp';
import linkedin from '../../assets/linkedinicon.webp';
import location from '../../assets/locationicon.webp';
import mail from '../../assets/mailIcon.webp';





const ProfileBox = () => {
    const [showPopup, setShowPopup] = useState(false);

    // Toggle the popup's visibility
    const togglePopup = () => setShowPopup(!showPopup);

    // Close the popup if the user clicks outside of it
    const closePopup = (event) => {
        if (event.target.className === "popup-overlay") {
            setShowPopup(false);
        }
    };
    return (
        <div className='profile-outline'>
            <div className='profile-container'>
                    <text className='title'>Information</text>
                    <img className='headshot' src={headshot.src} alt='image' />
                    <div className='iconandtextcontainer'>
                        <div className='iconsandtext'>
                            <img className='icon' src={location.src} alt='image' />
                            <text className='text'>Bend, OR</text>
                        </div>
                        <div className='iconsandtext' onClick={togglePopup}>
                            <img className='icon' src={mail.src} alt='image' />
                            <a className='text'>Email</a>
                        </div>
                        <a className='iconsandtext' href="https://www.linkedin.com/in/john-rundle-a73875255/" target="_blank">
                            <img className='icon' src={linkedin.src} alt='image' />
                            <a className='text'>LinkedIn</a>
                        </a>
                        <a className='iconsandtext' href="https://github.com/JACKRUNDLE" target="_blank">
                            <img className='icon' src={github.src} alt='image' />
                            <a className='text'>GitHub</a>
                        </a>

                        
                    </div>
                    
            </div>
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content">
                        <p>Email: rundlej@oregonstate.edu</p>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ProfileBox;