import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsCategory, updateCategory } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';


export default function CategoryEditScreen(props) {
  const categoryId = props.match.params.id;
  const [catName, setName] = useState('');
  
  const [catImage, setImages] = useState('');

  const categoryDetails = useSelector((state) => state.categoryDetails);

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;
  const { loading, error, category } = categoryDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        props.history.push('/categorylist');
        
        // const showImage=()=>{axios.get(`http://localhost:8080/api/category/${categoryId}/image`).then(res=>{setImages(res.data);
    
      }
      if (!category || successUpdate) {
        dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(detailsCategory(categoryId));
    } else {
      setName(category.catName);
      setImages(category.catImage);
    }
}, [category, dispatch, categoryId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
        updateCategory({
          categoryId,
          catName,
          //catImage
          //catImage:
        })
      );
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
      const { data } = await Axios.post(`http://localhost:8080/api/category/${categoryId}/image`, bodyFormData, {
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
          <h1>Edit Category {categoryId}</h1>
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