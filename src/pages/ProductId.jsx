import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Button, Carousel } from 'react-bootstrap';
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
    const quantitySum =()=>{
      setQuantity(quantity+1)
    }
    const quantityRest =()=>{
      if (quantity===0){
        setQuantity(quantity)
      }else {
        setQuantity(quantity-1)
      }
     
    }

    return (
      <>
        <div className='product-id'>
        <Carousel variant='dark'>
        <Carousel.Item>
        <img className='img-productsId' src={productsFound?.productImgs[0]} alt="" />
        </Carousel.Item>
        <Carousel.Item>
        <img className='img-productsId' src={productsFound?.productImgs[1]} alt="" />
        </Carousel.Item>
        <Carousel.Item>
        <img className='img-productsId' src={productsFound?.productImgs[2]} alt="" />
        </Carousel.Item>
           </Carousel>
        
           
           <div className='description-productsId'>
                <h2>{productsFound?.title}</h2> 
                <p style={{margin:"0 3rem", fontSize:".8rem"}}>{productsFound?.description}</p>
                <p style={{paddingTop:"4rem", paddingLeft:"1rem"}}>Status: <span>
                {productsFound?.status}
                  </span></p>
                  <div >
                  <Button onClick={quantityRest}>-</Button>
                  <input
                  style={{width:"50px", height:"48px"}}
                   type="number" 
                   value={quantity}
                   onChange={(e)=>setQuantity(e.target.value)}
                   />
                   <Button onClick={quantitySum}>+</Button>
                  </div>
                  <br />
                  <Button onClick={addToCart}> add to cart</Button>
           </div>
        </div>
        <div className='related-Products'>
        <h3>Related products:</h3>
        {relatedProducts.map((newsItem) => (
        <li  className='link-related'>
          <Link
          to={`/productsId/${newsItem.id}`}>
            {newsItem.title}{" "}
            <img style={{width:"100px",height:"150px" }} src={newsItem.productImgs[0]} alt="" />
            </Link>
        </li>
      ))}
      
        </div>
   
        </>
    );
};

export default ProductId;