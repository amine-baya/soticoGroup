import React, {useState, useEffect} from 'react'
import './Navbar.css'

import axios from 'axios' 
import { Link } from 'react-router-dom'
import SearchBox from '../SearchBox'
import {Route} from 'react-router-dom' 



const Navbar = ({history}) => {

   const [clicked, setclicked] = useState(false)
   const [navbarItems, setNavbarItems] =useState(false)
   const [data, setdata] =useState([])

 const handleClick = () =>{
  setclicked(!clicked)
}

const changeBackground = () =>{
if(window.scrollY>= 25 ){
  setNavbarItems(true)
}else{
  setNavbarItems(false)
}
}
    window.addEventListener('scroll',changeBackground)

    const getData = async () => {
      const {data} = await axios.get('/api/products ')

      setdata(data.products.filter(el => !el.parentId)) 
    }


    useEffect(() => {
      getData()
      
    }, [])

      
  return (
            <> 
      <nav className={navbarItems ? 'navbarItems sticky' : 'navbarItems' }>
        
        <h2 className="navbar_logo"><Link to="/">SoticoGroup </Link> </h2>
        <div className="menu-icon"  onClick={handleClick} >
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={clicked ? 'nav-menu active' : 'nav-menu'}> 
          {data.map((item, index)=> {
            
            return (
              <li key={index} className="Category_name" onClick={handleClick}>
                 <Link className="nav-links" to={`/product/${item._id}`}>
                   {item.name}
                  </Link> 
              </li>

            )
          })}
        </ul>
       <Route render={({ history }) => <SearchBox history={history}/>} />
      </nav>
       
            </>
    )
}

export default Navbar