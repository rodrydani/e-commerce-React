import React from 'react';
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getCartThunk } from '../store/slices/cart.slice';
import { Link } from 'react-router-dom';
import { checkoutCartThunk } from '../store/slices/cart.slice';


const CartSideBar = ({show, handleClose }) => {

  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const cart = useSelector((state) => state.cart);

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
       <Offcanvas.Body>
        {cart.map((cart) => (
        
                  <li>
                      <Link to={`/productsId/${cart.id}`}>
                 <h3><b>Product: </b>{cart.title}</h3>
                 <h3><b>Price: </b>${cart.price}</h3>
                      </Link>
                  </li> 
                 
        
        ))}
      </Offcanvas.Body> 
     <Button onClick={()=> dispatch(checkoutCartThunk())}>checkout</Button>
    </Offcanvas>
        </div>
    );
};

export default CartSideBar;