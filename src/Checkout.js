import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import QuantityBtn from './QuantityBtn';
import Title from './Title'

export default function Checkout() {

  let {cartItems} = useContext(CartContext)
  let cartEmpty = (cartItems.length <= 0) ? true : false;

  let grandTotal = cartItems.reduce((total, product) => {
    return total += product.price * product.quantity
  }, 0)

  const freeShippingPrice = 99

  return (
    <div>
      <Title mainTitle = 'Your cart'/>
      
      {
        cartEmpty &&
        <div>
          <div className="nothingInCart">
            Empty product<br/>
            <Link to={'/'}> <div className="backToGoodsListBtn"> ↩️ Please visit main page</div></Link>
          </div>

        </div>
      }

      {
        !cartEmpty && 
          <div className="container">
            <div className = "cartSection">
              <table className="checkoutTable">
                <tbody>
                  {
                    cartItems.map((product) =>
                    (
                      <tr key={product.id}>
                        <td>
                          <Link to={'/product/'+product.id}>
                            <img src={process.env.PUBLIC_URL + '/nft-imgs/' + product.image} alt={product.name} />
                          </Link>
                        </td>
                        <td>
                          <p className="addToCartInTotal">Name: {product.name}</p>
                          <p className="addToCartInTotal">Price: {product.price}</p>
                          <p className="addToCartInTotal"> Decription: {product.description}</p>
                        </td>
                        <td>
                          <QuantityBtn productInfo={product}/>
                        </td>
                        <td>
                          <div className="productSubTotal">
                          <span className="addToCartInTotal">RM{product.price * product.quantity}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              {/*Cart List*/}
              {/*for wat a function return if its a jsx, we have to put () instead of {} */}
            </div>
            <div className = "checkoutSection">
              <div className="fixPos">
                {/*Total price + Free service*/}
                <div><span className="addToCartInTotal">Total price for all selected item</span></div>
                <div className="grandTotal"><span className="addToCartInTotal">RM{grandTotal}</span></div>
                {
                  (grandTotal >= freeShippingPrice) ? 
                  <div className="freeShipping">Free shipping obtained ✔️</div> :
                  <div className="noShipping">
                    RM{freeShippingPrice} and above get free shipping <br/>
                    Spend RM{freeShippingPrice - grandTotal} more to get free shipping 
                  </div>
                }

                <button>Make Payment</button>
              </div>

            </div>
          </div>
      }


    </div>
  )
}
