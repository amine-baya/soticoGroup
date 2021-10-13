import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop' 
import Navbar from "./components/Navbar/Navbar";
import HomeScreen from './screens/HomeScreen';
import SeeScreen from './screens/see/See.js';
import CategoryScreen from './screens/categoryScreen/CategoryScreen';
import ProductScreen from './screens/productScreen/ProductScreen';
import SearchScreen from './screens/SearchScreen'
import Footer from './components/footer/Footer';


const App=() => {
  

 
  return (
     <Router>
      <ScrollToTop />
       <Navbar />
        <Route path='/' component={HomeScreen} exact />
        <Route path='/see' component={SeeScreen} exact />
        <Route path='/product/:id' component={CategoryScreen} exact />
        <Route path='/singleProduct/:id' component={ProductScreen} exact />
        <Route path='/search/:keyword' component={SearchScreen} exact />
       <Footer />

        
        
    </Router>
  );
}

export default App;
