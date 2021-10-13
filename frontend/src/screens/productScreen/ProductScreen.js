import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {Tabs,Tab} from 'react-bootstrap'
import './productScreen.css'


const ProductScreen = ({match}) => {
    const [data, setdata] = useState([])

    const [image, setimage] = useState()

     const container = useRef(null)

    const getData = async () => {
         const {data} = await axios.get(`/api/products/${match.params.id}`)

         setdata(data)
    }

    useEffect(() => {
       getData()
    }, [match])


    /*************************************************************** */
        
       if (container.current != null) {
           
               container.current.addEventListener('mouseover', function () {
                   imageZoom('featured')

               })


               function imageZoom(imgID) {
                   let img = document.getElementById(imgID)
                   let lens = document.getElementById('lens')

                   lens.style.backgroundImage = `url( ${img.src} )`

                   let ratio = 3

                   lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

                   img.addEventListener("mousemove", moveLens)
                   lens.addEventListener("mousemove", moveLens)
                   img.addEventListener("touchmove", moveLens)

                   function moveLens() {
                       /*
                       Function sets sets position of lens over image and background image of lens
                       1 - Get cursor position
                       2 - Set top and left position using cursor position - lens width & height / 2
                       3 - Set lens top/left positions based on cursor results
                       4 - Set lens background position & invert
                       5 - Set lens bounds
                   
                       */

                       //1
                       let pos = getCursor()
                       //console.log('pos:', pos)

                       //2
                       let positionLeft = pos.x - (lens.offsetWidth / 2)
                       let positionTop = pos.y - (lens.offsetHeight / 2)

                       //5
                       if (positionLeft < 0) {
                           positionLeft = 0
                       }

                       if (positionTop < 0) {
                           positionTop = 0
                       }

                       if (positionLeft > img.width - lens.offsetWidth / 3) {
                           positionLeft = img.width - lens.offsetWidth / 3
                       }

                       if (positionTop > img.height - lens.offsetHeight / 3) {
                           positionTop = img.height - lens.offsetHeight / 3
                       }

                       


                       //3
                       lens.style.left = positionLeft + 'px';
                       lens.style.top = positionTop + 'px';

                       //4
                       lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px'
                   }

                   function getCursor() {
                       /* Function gets position of mouse in dom and bounds
                        of image to know where mouse is over image when moved
                       
                       1 - set "e" to window events
                       2 - Get bounds of image
                       3 - set x to position of mouse on image using pageX/pageY - bounds.left/bounds.top
                       4- Return x and y coordinates for mouse position on image
                       
                        */

                       let e = window.event
                       let bounds = img.getBoundingClientRect()

                       //console.log('e:', e)
                       //console.log('bounds:', bounds)
                       let x = e.pageX - bounds.left
                       let y = e.pageY - bounds.top
                       x = x - window.pageXOffset;
                       y = y - window.pageYOffset;

                       return { 'x': x, 'y': y }
                   }

               }

               imageZoom('featured')
         
       }

  return (
    <>
   <section className="product_page"> 
       <div className="container">
    <div className="product_description_deatils" ref={container}>
            <div className="image_container_pos"  id="img-zoom-container">
                <div id="lens"></div>
                <img className="product_image" id='featured' src={image || data.image && data.image[0]} alt='sorry'/> 
            </div>
            <div className="product_text">
               <h2>{data.name}</h2> 

               

               <h4>État : <span>Nouveau produit</span> </h4>


                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="description">
                            <p>{data.description}</p>
                    </Tab>
                <Tab eventKey="profile" title="details">
 
                           <ul>
                                {data.descriptionDetail && data.descriptionDetail.map((el,index) => (
                                    <li key={index} >{el}</li>
                                ))}

                            </ul> 

                   
                </Tab>
                
                </Tabs>
               <div className='product_images'>
                   <h2 className='h4'></h2>
                   {data.image && data.image.map((el,index) => (
                       <img key={index} src={el} alt='sorry' onClick={() => setimage(el)}></img>
                   ))}
                   
               </div>
            </div>

        </div>
       </div>
             
       
       
       
   </section>
    
    </>
    )
  
}

 

export default ProductScreen
