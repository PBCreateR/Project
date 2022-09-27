import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteFood,
   listFoodsByCategory,
} from '../actions/foodActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  FOOD_DELETE_RESET,
} from '../constants/foodConstants';

export default function FoodListScreen(props) {
  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;
  const categoryId = props.match.params.id;
  const foodCreate = useSelector((state) => state.foodCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    food: createdFood,
  } = foodCreate;

  const foodDelete = useSelector((state) => state.foodDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = foodDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    // if (successCreate) {
    //   dispatch({ type: PRODUCT_CREATE_RESET });
    //   props.history.push(`/category/${createdProduct.categoryId}/edit`);
    //comment createdProduct word }
    if (successDelete) {
      dispatch({ type: FOOD_DELETE_RESET });
    }
    dispatch(listFoodsByCategory(categoryId));
  }, [createdFood, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (food) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteFood(food.foodId));
    }
  };

  // const createHandler = () => {
  //   dispatch(createProduct());
  // };
  return (
    <div>
      <div className="row">
        <h1>Foods</h1>
        {/* <button type="button" className="primary"  onClick={() =>
                      props.history.push('/category/add')
                    } >
          Create Product
        </button> */}{console.log(categoryId)}
      </div>
      {/* onClick={createHandler} */}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th>Image</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.foodId}>
                <td>{food.foodId}</td>
                <td>{food.foodName}</td>
                <td>{food.foodDescription}</td>
                <td>{food.foodPrize}</td>
                {/* <td>{product.catImage}</td> */}
                {<td> <img
                className="sightLarge"
                // src={"./food.foodImage"}
                src={(`/${food.foodImage}`)} 
                alt={food.foodName}
              ></img></td>}
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/food/${food.foodId}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(food)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
