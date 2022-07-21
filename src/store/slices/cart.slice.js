import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }

    }
})

export const { setCart } = cartSlice.actions;

export const getCartProducts = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = (cartProduct) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cartProduct, getConfig())
        .then(() => {
            dispatch(getCartProducts());
            alert('Agregado al carrito');
        })
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', [], getConfig())
        .then(() => {
            dispatch(setCart([]))
            dispatch(getCartProducts())
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
