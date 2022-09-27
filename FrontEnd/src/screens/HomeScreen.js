import React, { useEffect } from 'react';
import Category from '../components/Category';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../actions/categoryActions';
import "./Home.css";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <>
       <div class="bg-image1"></div>
       <div class="bg-text">
       Discover the best food & drinks
       </div>
     {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {categories.map((category) => (
              <Category key={category.categoryId} category={category}></Category>
              ))}
            </div>
          )}
    </>
  );
}