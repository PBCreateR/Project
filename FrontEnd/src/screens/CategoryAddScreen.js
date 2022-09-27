import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { createCategory } from '../actions/categoryActions';




export default function CategoryAddScreen(props) {
  
  const [catName, setName] = useState('');
  const dispatch = useDispatch();

  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(catName);
    // TODO: dispatch update product
    dispatch(
      createCategory({
          catName

        })
      );
     // alert("you have successfully added new category ");
     //dispatch(listProducts()); 
      props.history.push('/categorylist')
     
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Add Category</h1>
        </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={catName}
                onChange={(e) => setName(e.target.value)}
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
  );
}