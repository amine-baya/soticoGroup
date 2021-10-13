import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SingleProduct from '../components/menu_products/SingleProduct'

const SearchScreen = ({match}) => {

    const [data, setdata] = useState([])
   
    const [grid, setgrid] = useState('grid_3')
    const [active, setactive] = useState('active1') 
    const [active1, setactive1] = useState('')
    const [sorted, setSorted] = useState('') 

    const sortArray = [{ id: 0, name: "nouveaux" }, { id: 1, name: "Nom, A à Z" }, { id: 2, name: "Nom, Z à A" } ]

    if (sorted === "nouveaux") {
        window.location.reload()  

    }

    if (sorted === "Nom, A à Z"){
        data.sort((a, b) => a.name.toUpperCase().charCodeAt() - b.name.toUpperCase().charCodeAt()) 
    }

    if (sorted === "Nom, Z à A") {
        data.sort((a, b) => b.name.toUpperCase().charCodeAt() - a.name.toUpperCase().charCodeAt())
       
    }

    const keyword = match.params.keyword

    const getData = async () =>{
        const {data} = await axios.get(`/api/products/search?keyword=${keyword}`) 
        const filterData = await data.filter(el => el.type !== 'category')
        setdata(filterData)

        

    }

    useEffect(() => { 
        getData()
    }, [keyword])

    console.log(data); 
    
    return (
        <div>
            <div className='all_products_search'>
            <div className='container'>
                <div className="trier-bar" >
                <div className="trier-bar-grid">

                    <span onClick={() => {setgrid('grid_3'); setactive('active1'); setactive1('')}} > <i className = {`fas fa-th fa-2x active ${active} `}></i> </span>
                    <span onClick={() => { setgrid('grid_1'); setactive(''); setactive1('active1') }}> <i className={`fas fa-bars  active ${active1} `} ></i> </span>

                </div>

                <div className=" total-product ">

                    <h6 className= " trier-bar-h6 " >il ya {data.length} produits</h6>

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
                    {data.map(el => (
                        
                        <SingleProduct key={el._id} id={el._id} title={el.name} image={el.image[0]} li={el.descriptionDetail}  description={el.description}/>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default SearchScreen
