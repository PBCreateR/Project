import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { createFood } from '../actions/foodActions';
import Button from 'react-bootstrap/Button';


export default function FoodAddScreen(props) {
    const categoryId = props.match.params.id;
  const [foodName, setName] = useState('');
  //const [foodId, setId] = useState('');
  const [foodDescription,setDescription] =useState('');
  const [foodPrize, setPrize] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(foodName);
    console.log(foodDescription);
    // TODO: dispatch update product
    dispatch(
        createFood({
           // id:foodId,
           // categoryId:[{categoryId:categoryId}],
           categoryId,
            foodName,
            foodDescription,
            foodPrize

        })
      );
     // alert("you have successfully added new category ");
     //dispatch(listProducts()); 
      props.history.push(`/foodlist/${categoryId}`);
     
  };
 const clickHandler=()=>{
  props.history.push(`/foodlist/${categoryId}`);

 }

  return (
    <>
    <div>
    <h1 style={{display: 'flex',  justifyContent:'center'}}><button Linkto="/foodlist/" className="btn btn-primary"  onClick={clickHandler}> ViewList</button></h1>
    </div>
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
  <h1>Add Food {categoryId}</h1>
  
        </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={foodName}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="desc">description</label>
              <input
                id="desc"
                type="text"
                placeholder="Enter desciption"
                value={foodDescription}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={foodPrize}
                onChange={(e) => setPrize(e.target.value)}
              ></input>
            </div>

            {/* <div>
              <label htmlFor="image">Image</label>
              <img
                className="sightLarge"
                src={catImage}
                alt={catName}
              ></img>
              {/* <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={catImage}
               
                onChange={(e) => setImages(e.target.value)}
              ></input> *
            </div> */}
            {/* <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
            </div> */}
            <div>
              <label></label>
             <button className="primary" type="submit"  >
                ADD
              </button> 
              
            </div>
      </form>
    </div>
    </>
  );
}