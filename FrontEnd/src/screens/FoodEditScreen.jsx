import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsFood, updateFood } from '../actions/foodActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios'
import { FOOD_UPDATE_RESET } from '../constants/foodConstants';


export default function FoodEditScreen(props) {
  const foodId = props.match.params.id;
  const [foodName, setName] = useState('');
  const [foodDescription, setDescription] = useState('');
  const [foodPrize, setPrize] = useState('');
  const [foodImage, setImages] = useState('');
  const [categoryId,setCategoryId]=useState('');
  //const [loadf,setloadf]=useState(true);
  const foodDetails = useSelector((state) => state.foodDetails);

  const foodUpdate = useSelector((state) => state.foodUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = foodUpdate;
  const { loading, error, food } = foodDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    // if(loadf)
    // {
    //   setloadf(false);
    // }
    if (successUpdate) {
        props.history.push('/categorylist');
        
        // const showImage=()=>{axios.get(`http://localhost:8080/api/category/${categoryId}/image`).then(res=>{setImages(res.data);
    
      }
      if (!food || successUpdate) {
        dispatch({ type: FOOD_UPDATE_RESET });
      dispatch(detailsFood(foodId));
    } else {
    setName(food.foodName);
      setImages(food.foodImage);
      setDescription(food.foodDescription);
      setPrize(food.foodPrize);
      // setCategoryId(categoryId.categoryId);
    }
}, [food, dispatch, foodId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
        updateFood({
          foodId,
          foodName,
          foodDescription,
          foodImage:foodImage.foodImage,
          foodPrize
          //catImage
          //catImage:
        })
      );
      // setCategoryId(categoryId.categoryId);
      // console.log(categoryId.categoryId);
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
     bodyFormData.append('file', file);
   // bodyFormData.append('imageFile',imageFile)
    bodyFormData.append('fileName',file.name);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post(`http://localhost:8080/api/food/${foodId}/image`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImages(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Food {foodId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
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
              <label htmlFor="desc">Description</label>
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
                placeholder="Enter desciption"
                value={foodPrize}
                onChange={(e) => setPrize(e.target.value)}
              ></input>
            </div>
          
              <label htmlFor="catid"></label>
              <input
                id="catid"
                type="text"
                hidden
                value={categoryId.categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              ></input>
    


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
              ></input> 
            </div> */}
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit" >
                Update
              </button>
            </div>
          
          </>
        )}
      </form>
    </div>
  );
}