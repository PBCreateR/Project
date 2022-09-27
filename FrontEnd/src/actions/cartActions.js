import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const addToCart = (foodId, quantity) => async (dispatch, getState) => {
  const { data } = await Axios.get(`http://localhost:8080/api/food/view/${foodId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.foodName,
      images: data.foodImage,
      price: data.foodPrize,
      //countInStock: data.countInStock,
      food: data.foodId,
      quantity,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

export const removeFromCart = (foodId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: foodId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

  export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };