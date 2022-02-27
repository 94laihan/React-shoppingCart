import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import Title from './Title'


export default function ProductDetails() {
  
  let params = useParams()
  let [productDetails, setProductDetails] = useState(null);


  useEffect(
    () =>{
     //1. 当没有第二个参数， Component 每次 render 会触发这个function
     //2. 当有第二个参数， 一个空的array (Dependency Array)时： 只会在first render 时触发而已
     //3. 当Dependency Array 有变数时， 第一次网页render时 + 指定

    fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
    .then((resp) => resp.json())
    .then((dataa) => {
      let productInfo = dataa.find((element)=> element.id === parseInt(params.pId))
      setProductDetails(productInfo)
    })

    },[]) // <== Dependency array

  
  return (
    <div> 
        {
          productDetails && 
          <div className="ProductDetail">
            <Title mainTitle={`Details of ${productDetails.name} (id:${params.pId})`}/>
            
            <table width="100%">
              <tbody>
                <tr>
                  <td align="right">
                    <img src={process.env.PUBLIC_URL+'/nft-imgs/'+productDetails.image} width="400"/>
                  </td>
                  <td width="45%" padding="10">
                    <p className="addToCartInTotal">Name: {productDetails.name}</p>
                    <p className="addToCartInTotal">Price: RM{productDetails.price}</p>
                    <p className="addToCartInTotal">Description: {productDetails.description}</p><br/>
                    <QuantityBtn productInfo = {productDetails}/>
                  </td>
                </tr>
              </tbody>
            </table>
            
             
            
            
            
          </div>
        } 

      <Link to={'/'}>
        <div className="backToGoodsListBtn">
          ↪️ Back to main page
        </div>
         
      </Link>
    </div>
  )
}
