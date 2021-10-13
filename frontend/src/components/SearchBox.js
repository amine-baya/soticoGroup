import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import  './searchBox.css' 
const SearchBox = (props) => {
   
  const [keyword, setKeyword] = useState('') 

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      props.history.push(`/search/${keyword}`)    
    } else {
      props.history.push( `/` )
    }
  }
  return (
    <Form onSubmit={submitHandler} className="searchForm"  inline>
      <input 
      className="searchInput"
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Je cherche...'
      ></input>
      <button type='submit' className="searchBox_Button" >
        <i className="fas fa-search search_logo"></i> 
      </button>
    </Form>
  )
} 

export default SearchBox