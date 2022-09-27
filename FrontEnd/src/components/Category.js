import React from 'react';
import { Link } from 'react-router-dom';
// import Rating from './Rating';

export default function Category(props) {
  const { category} = props;
  
  return (
    <div key={category.categoryId} className="card" width="250px" height="300px">
      <Link to={`/food/${category.categoryId}/view`}>
        <img className="medium" src={category.catImage} alt={category.catName} />
        </Link>
      <div className="card-body" style={{width: "260px"}}>
      <Link to={`/food/${category.categoryId}/view`}>
          <h2>{category.catName}</h2>
          </Link>
          {/* <h2 className="h2Home">Category:{product.category}</h2> */}
        {/* <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating> */}
        {/* <div className="price">₹{product.price}</div> */}
      </div>
      
    </div>
  );
}
