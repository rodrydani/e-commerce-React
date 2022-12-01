import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
import axios from "axios";




export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
          }
    }
});
export const getCartThunk=()=>(dispatch)=>{
    dispatch(setIsLoading(true));
    return axios
    .get ("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res)=>dispatch(setCart(res.data.data.cart.products)))
    .finally(()=>dispatch(setIsLoading(false)))
}
export const createPurchasesThunk = (products) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post("https://e-commerce-api.academlo.tech/api/v1/cart",products, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch((error)=>console.log(error.response.data))
        .finally((res) => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases",{}, getConfig())
      .then(() => dispatch(setCart([])))
      .finally(() => dispatch(setIsLoading(false)));
}


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
