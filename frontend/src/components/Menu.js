 import React from 'react'



import { Link } from 'react-router-dom'

import './menu.css'

const Menu = (props) => { 
  
    
  return (
    <>
     
     <Link to={`/product/${props.id}`}>
        <div className='menu_cart'> 
              <div className="menu_cart_img">
                  <img src={props.image} alt='sorry'></img>
              </div>
              <h3>{props.name}</h3>
          </div>
     </Link>
     
    </>
    )
  
}

 

export default Menu
