import React from 'react';
import { Link } from 'react-router-dom';
// import Rating from './Rating';

export default function Food(props) {
  const { food} = props;
  
  console.log(food);
  
  return (
    <div key={food.foodId} className="card" width="250px" height="300px">
       <Link to={`/food/${food.foodId}/details`}>
        <img className="medium" src={`/${food.foodImage}`} alt={food.foodName} />
        </Link>  
        {console.log(food.foodImage)}

      <div className="card-body" style={{width: "260px"}}>
      <Link to={`/food/${food.foodId}/details`}>
          <h2>{food.foodName}</h2>
          </Link>
          <div className="price">₹{food.foodPrize}</div>

           <h2 className="h2Home">Description:{food.foodDescription}</h2> 
        {/* <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating> */}
        {/* <div className="price">₹{product.price}</div> */}
      </div>
    
    </div>
  );
}
