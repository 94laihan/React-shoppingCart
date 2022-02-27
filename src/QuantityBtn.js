import React from 'react'
import { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './CartContext'

export default function QuantityBtn({productInfo}) {

    const {cartItems, setCartItems} = useContext(CartContext)

    let productIndexInCart = cartItems.findIndex((element) =>
    {
        return element.id === productInfo.id 
    })
    //findindex
    //If found the product in the cart, return found index of cart array (0,1,2,3,...)
    //Else, return -1 (without found any matches)


    let [numInCart, setNumInCart] = useState((productIndexInCart === -1) ? 0 : cartItems[productIndexInCart].quantity)

    const handleAdd = ()=>{
        if(productIndexInCart === -1)
        {
            //Found no current item in the cart, add 1 element in the array
            setCartItems([
                {
                    "id":productInfo.id,
                    "name": productInfo.name,
                    "image": productInfo.image,
                    "price": productInfo.price,
                    "description": productInfo.description,
                    "quantity": 1
                },...cartItems
            ])
        }
        else
        {
            //Found current item in the cart, add the quantity only
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity++
            setCartItems(newCartArray)
        }

        setNumInCart(numInCart+1)
    }

    const handleMinus = ()=> 
    {
        if(cartItems[productIndexInCart].quantity === 1)
        {
            //Remove whole object
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart, 1)
            setCartItems(newCartArray)
        }
        else
        {
            //Only reduce one of the quantity
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart-1)
    }

    return (
        <div className="addToCart">
            {
                (numInCart === 0) ? 
                <span className='addToCartBtn' onClick = {handleAdd}>Add to cart</span> :
                <div>
                    <span className="subtractBtn" onClick = {handleMinus}>-</span>
                    <span className='addToCartInTotal'>{numInCart} items</span>
                    <span className="addBtn" onClick = {handleAdd}>+</span>
                </div>
            }
            
        </div>
    )
}
