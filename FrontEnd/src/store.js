import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';

import {
  userForgetReducer,
  userRegisterReducer,
  userSigninReducer,
  userDetailsReducer,
  userUpdateProfileReducer
  
} from './reducers/userReducers';

import {
  categoryDetailsReducer,
  categoryListReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
} from './reducers/categoryReducers';

import {
  foodDetailsReducer,
  foodListReducer,
  foodCreateReducer,
  foodUpdateReducer,
  foodDeleteReducer,
} from './reducers/foodReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
} from './reducers/orderReducers';

const initialState = {

  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },


  userForgetPassword: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  }, 
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
      paymentMethod: 'Paytm',
  }, 
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    cart: cartReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userForgetPassword :userForgetReducer,
    userUpdateProfile: userUpdateProfileReducer,
    categoryList : categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer,
    foodList : foodListReducer,
    foodDetails: foodDetailsReducer,
    foodCreate: foodCreateReducer,
    foodUpdate: foodUpdateReducer,
    foodDelete: foodDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer


});



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;