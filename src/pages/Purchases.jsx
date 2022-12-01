import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch= useDispatch();
    const purchases=useSelector(state=>state.purchases)
    useEffect(()=>{
    dispatch(getPurchasesThunk());
    },[]);
    console.log(purchases);
    return (
        <div className='purchases-div'>
           
            <ul>
            {purchases.map((purchase)=>(
                  <li style={{textAlign:"center", listStyle:"none"}}>
                     
                     {
                        purchase.cart.products.map((product)=>(
                            <li className='purchase-product'>
                                <Link className='purchase-products' to={`/productsId/${product.id}`}>
                               
                                    <li><h3><b>Product: </b>{product.title}</h3></li>
                                    <li> <b>Price: </b>${product.price}</li>
                                    <li> <b>Purchase Date: </b>{product.createdAt}</li>
                           
                           
                           
                                </Link>
                            </li> 
                           
                        ))
                     }
                  </li>  
            ))}  
            </ul>
        </div>
    );
};

export default Purchases;