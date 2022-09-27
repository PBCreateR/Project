import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  deleteCategory,
  listCategories,
} from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
} from '../constants/categoryConstants';
import {  useState} from 'react';

export default function CategoryListScreen(props) {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const [searchText, setSearchText] = useState('')

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    // if (successCreate) {
    //   dispatch({ type: category_CREATE_RESET });
    //   props.history.push(`/category/${createdcategory.categoryId}/edit`);
    //comment createdcategory word }
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    dispatch(listCategories());
  }, [createdCategory, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (category) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteCategory(category.categoryId));
    }
    props.history.push('/categorylist')
  };

  // const createHandler = () => {
  //   dispatch(createcategory());
  // };
  return (
    <div>
      <div className="row">
        <h1>Categories</h1>
        <button type="button" className="primary"  onClick={() =>
                      props.history.push('/category/add')
                    } >
          Create Category
        </button>
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
              <th>Image</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
             

            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.catName}</td>
                {/* <td>{category.catImage}</td> */}
                <td> <img
                className="sightLarge"
                //src={category.catImage}
                //src={`/${food.foodImage}`}
                src={`/${category.catImage}`}
                alt={category.catName}
              ></img></td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/category/${category.categoryId}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(category)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/food/${category.categoryId}`)
                    }
                  >
                    Add Foods
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/foodlist/${category.categoryId}`)
                    }
                  >
                    View Foods
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
