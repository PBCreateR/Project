import React, { useEffect } from 'react';
import Food from '../components/Food';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listFoodsByCategory } from '../actions/foodActions';


export default function FoodScreen(props) {
  const dispatch = useDispatch();
  const categoryId = props.match.params.id;
  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;

  useEffect(() => {
    dispatch(listFoodsByCategory(categoryId));
  }, [dispatch]);

  return (
    <div>
     {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        
        <div className="row center">
          {foods.map((food) => (
              <Food key={food.foodId} food={food}></Food>
              ))}
            </div>
          )}
    </div>
  );
}