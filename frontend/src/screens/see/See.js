import React from 'react'
import './see.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image from '../../image/company.jpg'
import image1 from '../../image/usine1.jpg'
import image2 from '../../image/usine2.jpg'
import image3 from '../../image/usine3.jpg'
import image4 from '../../image/usine4.jpg'
import image5 from '../../image/usine5.jpg'
import image6 from '../../image/usine6.jpg'
import image7 from '../../image/usine7.jpg'
import image8 from '../../image/usine8.jpg'
import image9 from '../../image/usine9.jpg'
import image10 from '../../image/usine10.jpg'
import image11 from '../../image/usine11.jpg'
import image12 from '../../image/usine12.jpg'



const See = () => {
    return (
        <div className="see container">
           <Carousel showArrows={true}>
                <div>
                    <img src={image} />
                   
                </div>
                <div>
                    <img src={image1} />
                    
                </div>
                <div>
                    <img src={image2} />
                   
                </div>
                <div>
                    <img src={image3} />
                    
                </div>
                <div>
                    <img src={image4} />
                    
                </div>
                <div>
                    <img src={image5} />
                    
                </div>
                <div>
                    <img src={image6} />
                    
                </div>
                <div>
                    <img src={image7} />
                    
                </div>
                <div>
                    <img src={image8} />
                    
                </div>
                <div>
                    <img src={image9} />
                    
                </div>
                <div>
                    <img src={image10} />
                    
                </div>
                <div>
                    <img src={image11} />
                    
                </div>
                <div>
                    <img src={image12} />
                    
                </div>
            </Carousel>
        </div>
    )
}

export default See
