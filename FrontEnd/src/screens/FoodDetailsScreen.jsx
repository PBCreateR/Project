import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsFood } from '../actions/foodActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';




export default function FoodDetailsScreen(props) {
  
  const dispatch = useDispatch();
  const foodId = props.match.params.id;
 
  const [qty, setQty] = useState(1);
  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;
  
  useEffect(() => {
    dispatch(detailsFood(foodId));
  }, [dispatch, foodId]);

  

  const addToCartHandler = () => {
    props.history.push(`/cart/${foodId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back To Home</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="sightLarge"
                src={`/${food.foodImage}`}
                alt={food.foodName}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{food.foodName}</h1>
                </li>
                <li>
                  {/* <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating> */}
                </li>
                <li>Pirce : ₹{food.foodPrize}</li>
                <li>
                  Description:
                  <p>{food.foodDescription}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div style={{backgroundColor:"#f0e3e3f8",padding: "1rem",textAlign: "center"}}>
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">₹{food.foodPrize}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                    </div>
                  </li>

                  {/* {product.countInStock > 0 && ( */}
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                               <option>
                                   
                                   </option> 
                              {[...Array(20).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  {/* )} */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}