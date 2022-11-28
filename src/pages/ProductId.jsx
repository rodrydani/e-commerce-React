import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';


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
    return (
        <div>
            <h1>{productsFound?.title}</h1>
            <img style={{width:"100px"}} src={productsFound?.productImgs[0]} alt="" />
            <h3>Related products:</h3>
      {relatedProducts.map((newsItem) => (
        <li>
          <Link to={`/productsId/${newsItem.id}`}>{newsItem.title}</Link>
        </li>
      ))}
        </div>
    );
};

export default ProductId;