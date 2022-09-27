import Axios from 'axios';
import {
  FOOD_CREATE_FAIL,
  FOOD_CREATE_REQUEST,
  FOOD_CREATE_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_UPDATE_REQUEST,
  FOOD_UPDATE_SUCCESS,
  FOOD_UPDATE_FAIL,
  FOOD_DELETE_REQUEST,
  FOOD_DELETE_FAIL,
  FOOD_DELETE_SUCCESS,
} from '../constants/foodConstants';

export const listFoods = () => async (dispatch) => {
  dispatch({
    type: FOOD_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('http://localhost:8080/api/food');
    
    dispatch({ type: FOOD_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FOOD_LIST_FAIL, payload: error.message });
  }
};

export const listFoodsByCategory = (categoryId) => async (dispatch) => {
  dispatch({
    type: FOOD_LIST_REQUEST,payload: categoryId
  });
  try {
    const { data } = await Axios.get(`http://localhost:8080/api/food/${categoryId}`);
    
    dispatch({ type: FOOD_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FOOD_LIST_FAIL, payload: error.message });
  }
};

export const detailsFood = (id) => async (dispatch) => {
  
  dispatch({ type: FOOD_DETAILS_REQUEST, payload: id });
  try {
    const { data } = await Axios.get(`http://localhost:8080/api/food/view/${id}`);
    
    dispatch({ type: FOOD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOOD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createFood = (food) => async (dispatch, getState) => {
  console.log("In details food"+ food)
 // console.log("1st with no"+food[0]);
 // console.log(food.categoryId[0].categoryId);
  dispatch({ type: FOOD_CREATE_REQUEST,payload: food });
  const {
    userSignin: { userInfo },
  } = getState();
  try {

    const { data } = await Axios.post(
      `http://localhost:8080/api/food/${food.categoryId}`,
      food,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    console.log(data);
    dispatch({
      type: FOOD_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FOOD_CREATE_FAIL, payload: message });
  }
};
export const updateFood = (food) => async (dispatch, getState) => {
  dispatch({ type: FOOD_UPDATE_REQUEST, payload: food });
  const {
    userSignin: { userInfo },
  } = getState();
  console.log(food);
  try {
    const { data } = await Axios.put('http://localhost:8080/api/food', food, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FOOD_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FOOD_UPDATE_FAIL, error: message });
  }
};

export const deleteFood = (foodId) => async (dispatch, getState) => {
  dispatch({ type: FOOD_DELETE_REQUEST, payload: foodId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`http://localhost:8080/api/food/${foodId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FOOD_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FOOD_DELETE_FAIL, payload: message });
  }
};
