import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Button } from 'react-bootstrap';
import { createPurchasesThunk } from '../store/slices/cart.slice';




const ProductId = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    
  useEffect(() => {
    dispatch(getProductsThunk());
  }, []); 

//const newsList = useSelector((state) => state.news);
  const newProduct = useSelector(state=>state.products);
  
// const news = newsList.find((newsItem) => newsItem.id === Number(id));
  const productsFound = newProduct.find((products)=>products.id === Number(id));

  const relatedProducts= newProduct.filter(
    (products) => products.category.id === productsFound.category.id &&
    productsFound.id !== products.id
  );

  const [quantity, setQuantity] = useState(1);

  const addToCart =()=>{
      const products={
        id:productsFound.id,
        quantity:quantity,
      };
      dispatch(createPurchasesThunk(products))
      console.log(products);
    }

    return (
      <>
        <div className='product-id'>
          <img className='img-productsId' src={productsFound?.productImgs[0]} alt="" />
           
           <div className='description-productsId'>
                <h2>{productsFound?.title}</h2> 
                <p style={{margin:"0 3rem", fontSize:".8rem"}}>{productsFound?.description}</p>
                <p style={{paddingTop:"4rem", paddingLeft:"1rem"}}>Status: <span>
                {productsFound?.status}
                  </span></p>
                  <input
                   type="text" 
                   value={quantity}
                   onChange={(e)=>setQuantity(e.target.value)}
                   />
                  <Button onClick={addToCart}> add to cart</Button>
           </div>
        </div>
        <div className='related-Products'>
        <h3>Related products:</h3>
        {relatedProducts.map((newsItem) => (
        <li>
          <Link to={`/productsId/${newsItem.id}`}>{newsItem.title}</Link>
        </li>
      ))}
      
        </div>
   
        </>
    );
};

export default ProductId;