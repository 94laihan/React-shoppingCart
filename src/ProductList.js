import React from 'react'
import {Link} from 'react-router-dom'
/*import logo from ./zzzz.png*/ 
import styles from './ProductList.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Title from './Title';
import QuantityBtn from './QuantityBtn';

export default function ProductList() {

    let [productList, setProductList] = useState([]); 
    // 首先， 上面的productList 是个state。
    // 每次 state 有变化， 会重新整理一次整个component （可以说是re-render component）

    // let [input, setInput] = useState('');

    // let [toDoList, setToDoList] = useState([]);
    // let [finalToDoList, setFinalToDoList] = useState([]);

    useEffect(
        () =>{
         //1. 当没有第二个参数， Component 每次 render 会触发这个function
         //2. 当有第二个参数， 一个空的array (Dependency Array)时： 只会在first render 时触发而已
         //3. 当Dependency Array 有变数时， 第一次网页render时 + 指定

        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
        .then((resp) => resp.json())
        .then((dataa) => setProductList(dataa));

        },[]) // <== Dependency array

    // useEffect(()=>
    // {
    //     if(input.length > 4)
    //         console.log("Too long")
    //     else 
    //         console.log("Too short")
    // }, [input])

    // useEffect(()=>{
    //     //Check the limit 
    // },[toDoList])

    // useEffect(()=>{
    //     //
    //     console.log(finalToDoList)
    // },[finalToDoList])

    // const add2List = ()=>{
    //     let newArr = [...finalToDoList]
    //     newArr.push(toDoList)
    //     setFinalToDoList(newArr)
    // }



  return  (
    //React Fragment shortform
    <>
        {/* <input type="text" onChange={(e) => setInput(e.target.value)}/><br/>
        <input type="text" onInput={(e) => setToDoList(e.target.value)}/>
        <button onClick={add2List}>Add to list</button> */}

    
        <Title mainTitle="Please Select Your Lovely NFT."/>

        {/*<img src = {logo} width = {400} height = {400} />*/}

        <div className="container">
            {
                productList.map(product => (
                    // <div className = {styles.productBorder} key={product.id}>
                    <React.Fragment key={product.id}>
          
                        <div className="containerItem">
                            <Link to={'/product/'+product.id}>
                                <img src= {process.env.PUBLIC_URL + '/nft-imgs/' + product.image} alt={product.name}/>  
                            </Link>

                            <div className="productName">
                                {product.name} - RM{product.price} per item
                            </div>
            
                            <QuantityBtn productInfo={product}/>
                        </div>

                    </React.Fragment>
                ))
            }
        </div>

    </>
  )
}
