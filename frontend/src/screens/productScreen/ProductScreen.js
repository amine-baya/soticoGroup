/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {Tabs,Tab} from 'react-bootstrap'
import ReactImageMagnify from 'react-image-magnify';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match])


  return (
    <>
   <section className="product_page"> 
       <div className="container  ">
    <div className="product_description_deatils" ref={container}> 
            <div className="image_container_pos"  >
               <ReactImageMagnify {...{
                                                smallImage: {
                                                    alt: 'data.name',
                                                    isFluidWidth: true,
                                                    src: image || data.image && data.image[0],
                                                    height: '100%', 
                                                },
                                                largeImage: {
                                                    src: image || data.image && data.image[0], 
                                                    width: 1200,
                                                    height: 1800,           
                                                }
                                            }} /> 
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
