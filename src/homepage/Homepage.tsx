import React from 'react';
import './homepage.css';
import ProfileBox from './profilebox/Profilebox';
import HomePageHeader from './Homepageheader';
import Resume from './resume/Resume';


function HomePage() {
    return (
        <div className='Outer-container'>
            <HomePageHeader />
            <div className='PageBottom'>
                <ProfileBox/>
                <Resume/>
            </div>
        </div>
    );
};

export default HomePage;