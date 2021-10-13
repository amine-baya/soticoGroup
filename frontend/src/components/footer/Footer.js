import React from 'react'
import './footer.css'

import { Link } from 'react-router-dom';
const Footer = () => {
    return (
       <section className='footer_section' > 
    <div className="container footer_section_grid">

    <div className="footer_one">
      <h4>Qui Sommes Nous</h4>
     <p>
         <strong className="strong">SOTICO Group </strong>  
   est une entreprise familiale, fondée en 1982 par M. Mohamed KHALFALLAH,
c’est une des premières entreprises Tunisienne spécialisée dans la fabrication
de vêtements professionnels pour les secteurs de la santé, l’industrie et
retardateur de flamme
     </p>
      <span>  
        <Link to="/see">voir plus </Link>
      </span>
    </div>


    <div className="footer_three">
      <h4>Contactez-Nous</h4>
       <ul> 
        <li> <i className="fas fa-phone-alt"></i> (+216) 73 288 533/544</li>
        <li><i className="fas fa-fax"></i> (+216) 73 288 515</li>
        <li><i className="far fa-envelope"></i> mk@soticogroup.com / contact@soticogroup.com</li>
          <li><i className="fas fa-map-marked"></i> GP1, Route de Sfax
Z.I. BeniRabiaa 4015 
M’saken - Tunisie</li>
        <li> 
            <i className="fab fa-facebook-square fa-2x "></i>
            <i className="fab fa-instagram-square fa-2x"></i>
            <i className="fab fa-linkedin  fa-2x"></i>
        

          </li>

      </ul>
    </div>

    </div>


    </section>
    )
}

export default Footer
