import React , {useState} from 'react'
import './singleProduct.css'

import { Link } from 'react-router-dom';
const SingleProduct = (props) => {

    const [isFlipped, setIsFlipped] = useState(true)
const handleClick = ()=> {
    setIsFlipped(!isFlipped)
}

    return (
      <div className="maincard">
           <div className={isFlipped ? "thecard" : "thecard show_card" } >
      
            <div  className= "thefront">
              <img src ={props.image}  alt='sorry'/> 
            
              <span onClick={handleClick} className="details_back" ><i class="fas fa-info-circle "></i></span>
              <h4>{props.title}</h4>
              <p>{props.description}</p>
                <Link to={`/singleProduct/${props.id}`}>  
                <span className="see_more" >
                 Détails
                 </span>
                 </Link> 
            </div>

          <div  className= "theback" >
           
            <span onClick={handleClick} className="back_to_front" ><i class="fas fa-undo "></i></span> 

              <div >
                <h4>detail</h4>
                <ul className='theback_content'>
                    {props.li.map(el => (
                      <li>{el}</li>
                    ))}   
                </ul>
              </div>
                    

          </div>
     
          </div>
      </div>
     

     
    )
}

export default SingleProduct
