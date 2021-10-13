 import React from 'react'

import {Link} from 'react-router-dom'

import './background.css'

const Background = () => {
  
    
  return (
    <>
     
      <section className='background'>  
          <div className='text'>  
              <h1>bienvenue à soticoGroup</h1>
          </div>
          <div className='first_cercle'></div>
          <div className='second_cercle'></div> 
          <div className='third_cercle'></div>
          <Link to='/see' className='four_cercle'></Link>
          <div className='wave'></div>
      </section>
      
     
    </>
    )
  
}

 

export default Background
