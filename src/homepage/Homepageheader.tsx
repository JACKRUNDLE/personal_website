"use client";
import React from 'react';
import './homepage.css';
import Banner from "../assets/homepage2.webp"


export default function Homepageheader() {
    return(
        <div>
            <img className="bannerimage" src={Banner.src} alt="image" />
        </div>
        


    );


};
