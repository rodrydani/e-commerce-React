import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { filterProductsThunk, getProductsThunk, filterQueryThunk } from '../store/slices/products.slice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products)

    const [categoriesList, setCategoriesList] = useState([]);
    const [inputSearch, setInputSearch] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());

        axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategoriesList(res.data.data.categories));
      }, []);

      console.log(categoriesList);
      console.log(products);
    return (
        <div>
          <div className='category-list'>
                 {categoriesList.map((category) => (
            <button className='button-list' onClick={()=> dispatch(filterProductsThunk(category.id))} >{category.name}</button>
        
             ))}
          </div>
      
      <InputGroup  className="mb-3">
        <Form.Control
          placeholder="seach Product"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Button  variant="outline-secondary" id="button-addon2"
         onClick={() => dispatch(filterQueryThunk(inputSearch))}
        >
         Seach
        </Button>
      </InputGroup>
      <div className="grid-products">
        {products.map((e)=>(
          <li>
             <Link to={`/productsId/${e.id}`}>
             <Card className="card-product" style={{ width: '400px' }}>
      <Card.Body  className='card-body'>
           
              <div className='link-card'>
                {e.title} {" "}
                <Card.Img style={{ width: '200px', height:"200px" }} variant="top" src={e.productImgs[0]}  />
                </div>
               <div style={{color:"red", paddingTop:"2rem"}}>
                  <p><b>Price:{" "}</b>${e.price}</p> 
               </div>
          </Card.Body>
         </Card>
         </Link>
            </li>
        ))}
      </div>
        </div>
    );
};

export default Home;