import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SingleProduct from '../../components/menu_products/SingleProduct.js'
import './category.css'

import Menu from '../../components/Menu'

import styled, { keyframes } from 'styled-components'




const CategoryScreen = ({match}) => { 

    const [datas, setdata] = useState([])
    const [children, setChildren] =  useState([])
    const [items, setitems] = useState([])
    const [grid, setgrid] = useState('grid_3')
    const [active, setactive] = useState('active1') 
    const [active1, setactive1] = useState('')
    const [sorted, setSorted] = useState('');

    const sortArray = [{ id: 0, name: "nouveaux" }, { id: 1, name: "Nom, A à Z" }, { id: 2, name: "Nom, Z à A" } ]

    if (sorted === "nouveaux") {
        window.location.reload()  

    }

    if (sorted === "Nom, A à Z"){
        children.sort((a, b) => a.name.toUpperCase().charCodeAt() - b.name.toUpperCase().charCodeAt())
    }

    if (sorted === "Nom, Z à A") {
        children.sort((a, b) => b.name.toUpperCase().charCodeAt() - a.name.toUpperCase().charCodeAt())
       
    }
   


     const getData = async () => {

      const {data} = await axios.get('/api/products ') 

       setdata(data.products) 

        const product = data.products.find(el => el._id === match.params.id)

        
    const anime = keyframes`
     0%
    {
        opacity: 0;
        transform: scale(0) translateY(1000px);
    }
    50%
    {
        opacity: 1;
        background-position: center;
        background-attachment: fixed;
    }
    100%
    {
        opacity: 1;
        transform: scale(1) translateY(0);
        background: url(${product && product.image[0] });
        background-position: center;
        background-attachment: fixed;
         
    }
`;

        const Mehdi = styled.div 
        `
            position: relative;
            display: block;
            width: 20%;
            height: 7vh;
            animation: ${anime} 1s ease-in-out forwards;
            background-size: cover;
            background-repeat: no-repeat;
        `

         

    let item = []
    
      for (let i = 1; i < 80; i++) {

        const math = Math.ceil(Math.random() * 150)

        let styles = {
    animationDelay: `${math * 0.02}s`,
    
  };
        
          item.push(<Mehdi className='blocks' style={styles}></Mehdi>)

      }
      
      setitems(item)

       child = data.products.filter(el => el.parentId === match.params.id)
    
    setChildren(child)

    }

    let child
    useEffect(() => { 
    
    getData()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ match.params.id])

    const categoryName = datas.find(el => el._id === match.params.id )
        
    
  return (
    <div>
            <div className='categoryScreen container'>
            <div className='banner'>
                    {items}
            <div className={`${categoryName !== undefined && !categoryName.description && 'd-none'} description`}> 
                <div className='container'>
                    <h2 className="description_h2">{categoryName !== undefined && categoryName.name}</h2>
                    <p>{categoryName !== undefined && categoryName.description}</p>
                </div>
            </div>  
            </div>
        </div>

        {categoryName !== undefined && categoryName.type === 'category' ? (
            <>
            <div className='container'>
                <h3 className="category_name_menu">{categoryName !== undefined && categoryName.name}</h3>
                <hr></hr> 
                 <h4 className="sous_category_name_menu">Sous-catégories</h4>
            </div>

            <section >
                <div className='container menu_cart_section'>

                    {children.map(menu => <Menu key={menu._id} name={menu.name} image={menu.image[0]} id={menu._id} /> )} 

                </div>
                </section>
                </>
            ) : (
            <div className='all_products'>
            <div className='container'>
                <h3 className="category_name_menu">{categoryName !== undefined && categoryName.name}</h3>
                <hr></hr>
                <div className="trier-bar" >
                <div className="trier-bar-grid">

                    <span onClick={() => {setgrid('grid_3'); setactive('active1'); setactive1('')}} > <i className = {`fas fa-th fa-2x active ${active} `}></i> </span>
                    <span onClick={() => { setgrid('grid_1'); setactive(''); setactive1('active1') }}> <i className={`fas fa-bars  active ${active1} `} ></i> </span>

                </div>

                <div className=" total-product ">

                    <h6 className= " trier-bar-h6 " >il ya {children.length} produits</h6>

                </div>

                <div className="select-sort-product"> 
                    <span className="select-sort-produc-span"  > trier par :</span>
                    
                    <select className="form-control form-control-sm  select-sort-product-select"
                        onChange={(e) => setSorted(e.target.value)} 
                    >  
                        {sortArray.map(sort => (
                               
                            <option key={sort.id} value={sort.name} > 
                                {sort.name}
                                    </option>
                                ))
                           }
                    </select>
                    
                </div>
            </div>
                <div className= {grid} >
                    {children.map(el => (
                        
                        <SingleProduct key={el._id} id={el._id} title={el.name} image={el.image[0]} li={el.descriptionDetail}  description={el.description}/>
                    ))}
                </div>
            </div>
            </div>
        )}
    </div>
    )
  
}

  

export default CategoryScreen
