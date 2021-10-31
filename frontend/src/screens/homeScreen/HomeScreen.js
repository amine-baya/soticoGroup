import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom'
import Background from '../../components/background/Background'
import './HomeScreenCss.css'


const HomeScreen = () => {
  const [data, setdata] =useState([])
  const [disabel, setdisabel] =useState(false)
  const [name,setName]=useState('')
  const [lastname,setLastname]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')
  const [send,setSend]= useState(false)

  const getData = async () => {
      const {data} = await axios.get('/api/products ')

      setdata(data.products.filter(el => !el.parentId)) 
    }
    const AnyReactComponent = ({ text }) => <div>{text}</div>;

   const defaultProps = {
    center: {
      lat: 35.72986,
      lng: 10.5898063
    },
    zoom: 11
  };

    useEffect(() => {
      getData()
      
    }, [])


   const handleName=(e)=>{
     e.preventDefault()
      setName(e.target.value)
    }

    const handleLastName=(e)=>{
          setLastname(e.target.value)
        }

     const handleEmail=(e)=>{
      setEmail(e.target.value)
    }
     const handleMessage=(e)=>{
      setMessage(e.target.value)
    }

    const resetForm=()=>{
     setdisabel(false)
      setName('')
      setLastname('')
      setEmail('')
      setMessage('')

    setTimeout(() => {
      
      setSend(false)
    }, 4000);
      

    }

    const  formSubmit=  (e)=>{
      e.preventDefault()

      setdisabel(true)
      let data ={
        name,
        lastname,
        email,
        message
      }

    
       axios.post('/api/forma',data).then(res=>{
         setSend(true)
         resetForm()
      }).catch(()=>{
        console.log('message not sent');
      })
    }

     




  return (
    <>
     <Background/> 
 
     <section className="about_us">
       <div  className="container about_us_container">  
        <h2>Qui Sommes nous</h2>

        <p>
        <strong className="strong">SOTICO Group</strong>  
           est une entreprise familiale, fondée en 1982 par M. Mohamed KHALFALLAH,
          c’est une des premières entreprises Tunisienne spécialisée dans la fabrication
          de vêtements professionnels pour les secteurs de la santé, l’industrie et
          retardateur de flamme, située à BENIRABIAA-M’SAKEN dans la région de
          SOUSSE à 15 min de l’Aéroport de Monastir et 1H30 de l’Aéroport de TUNIS afin
          de faciliter le transport et la logistique et d’être toujours performants.
          Nous avons comme particularité d’être soucieux de la qualité de nos produits et de 
          la satisfaction optimale de nos clients.
          Nous avons le savoir faire avec une expérience de la création à la réalisation fini.
          Nous avons mis en place un système qualité validé par une certification ISO 9001
          version 2008 obtenue en 2010 par un des leaders mondiaux de la certification.
        </p>

       </div>
    
     </section>
    <section className=" our_services">

        <h2>Nos services</h2>
      <div className="container">
          {data.map((item, index)=> {
            
            return (
              <div key={index} className="our_services_category" >
                 <Link to={`/product/${item._id}`}>
                 <img src={item.image[0]} alt="Service"  />  
                  </Link>
                  <h5>{item.name} </h5> 
              </div>

            )
          })}

       </div>      
    </section>

   <div className="Contactez_Nous">

    <h2>Contactez Nous</h2>
   </div>

    <section className="contact_us">
      <div className="container ">
        <form onSubmit={formSubmit} className="form_container"  >
          <div>
             <div className="singleItem">
              <label htmlFor="name">Nom</label>
              <input type="text" name="name" className="name" placeholder="Nom" value={name} onChange={handleName} ></input>
            </div>
            <div className="singleItem">
              <label htmlFor="lastname">prénom</label>
              <input type="text" name="lastname" className="lastname" placeholder="Prénom" value={lastname} onChange={handleLastName}></input>
          </div>
            <div className="singleItem">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="email" placeholder="Email" value={email} onChange={handleEmail} required={true}></input>
          </div>

          </div>
         <div>
              <div className="textArea singleItem">
                    <label htmlFor="message" className="message_label">Message</label>

                    <textarea name="message" cols="30" rows="5" placeholder="message..." value={message} onChange={handleMessage}    >

                    </textarea>
              </div>
                <div className="form_button">
                  <button type="submit" disabled={disabel} className={disabel ? 'disabl' : ''}>
                    Envoyé
                  </button>
                </div>
          </div>
          
        </form>
          <div  className={send ? "message_success_show " :  " message_success " }  >
             Message envoyé
          </div>
      </div>

    </section>

     <section className="google_map">

      <div className="container">

        
   <div style={{ height: '40vh', width: '100%', marginTop:'10px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.MAP_KEY}   } 
          defaultCenter={defaultProps.center} 
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals={true} 
        >
          <AnyReactComponent
            lat={35.72986}
            lng={10.5898063}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      </div>
    </section> 

    </>
    )
  
}

 

export default HomeScreen
