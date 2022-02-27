import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ProductList from './ProductList.js';
import Checkout from './Checkout.js';
import ProductDetails from './ProductDetails.js';
import Page404 from './Page404.js';
import { CartContext } from './CartContext.js';
import { useState } from 'react';


function App() {

  const [cartItems, setCartItems] = useState([]) // Here, cartItems is an empty array 

  return (
      <BrowserRouter>

      <CartContext.Provider value ={{cartItems, setCartItems}}>

        <nav>
          <Link to= "/">Main Page</Link>
          <Link to= "/checkout">Check it out</Link>
        </nav>

        <Routes>
            <Route path = "/" element = {<ProductList/>}/> {/*<- This is main page*/}

            <Route path = "/product" element = {<ProductDetails/>}>
              <Route path = ":pId" element = {<ProductDetails/>}/>      
            </Route>

            <Route path = "/checkout" element = {<Checkout/>}/>
            <Route path = "*" element = {<Page404/>}/>

        </Routes>


      </CartContext.Provider>


      </BrowserRouter>
  );
}

export default App;
