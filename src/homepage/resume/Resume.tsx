import * as React from 'react';

import './resume.css'
import csresume from "../../assets/CsResume.png"




export default function Resume() {
  return (
    <div className='outline'>
        <div className='container'> 
            <img className="Photo" src={csresume.src} alt='photo'/>
        </div>
    </div>
  )};