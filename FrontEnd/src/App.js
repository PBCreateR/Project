
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SigninScreen from './screens/SigninScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import CategoryEditScreen from './screens/CategoryEditScreen';
import RegisterScreen from './screens/RegisterScreen';
import CategoryAddScreen from './screens/CategoryAddScreen';
import ProfileScreen from './screens/ProfileScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import FoodAddScreen from './screens/FoodAddScreen';
import FoodListScreen from './screens/FoodListScreen';
import FoodEditScreen from './screens/FoodEditScreen';
import CartScreen from './screens/CartScreen';
import FoodScreen from './screens/FoodScreen';
import FoodDetailsScreen from './screens/FoodDetailsScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import FinalScreen from './screens/FinalScreen';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = userSignin;

  const { cartItems } = cart;
  // const isadmin = useSelector((state) => state.userSignin.role);
  // const { isadmin } = isadmin ;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
      <BrowserRouter>
    <div className="grid-container">

      <header className="row">
        <div>
          
        <Link className="brand" to="/">
            Home
            </Link>
        </div>
             
        <div>
          
        <Link className="pizzahut" to="/">
            Food Ordering Portal
            </Link>
        </div>
        <div>
        <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.firstName} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" >Sign In</Link>
            )}

         {userInfo && userInfo.role==="ADMIN" && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/categorylist">Categorys</Link>
                  </li>
                </ul>
              </div>
            )}



        </div>
      </header>
      <main>
     
      <Route path="/"  component={HomeScreen} exact></Route>
      <Route path="/signin"  component={SigninScreen} exact></Route>
      <Route path="/register"  component={RegisterScreen} exact></Route>
       
      <Route path="/forgotPassword" component={ForgetPasswordScreen} exact></Route>
      <Route path="/cart/:id?" component={CartScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/FinalScreen" component={FinalScreen}></Route> 
      <Route
            path="/food/:id/view"
            component={FoodScreen}
          ></Route> 
           <Route
            path="/food/:id/details"
            component={FoodDetailsScreen}
          ></Route> 
           <PrivateRoute
            path="/profile"
            component={ProfileScreen}
      ></PrivateRoute>
      <AdminRoute
            path="/categorylist"
            component={CategoryListScreen} exact
          ></AdminRoute>
         <Route
            path="/category/:id/edit"
            component={CategoryEditScreen}
            
          ></Route>
          <Route
            path="/category/add"
            component={CategoryAddScreen}
            exact
          ></Route>
              <Route
            path="/food/:id"
            component={FoodAddScreen}
            exact
          ></Route>
          <Route
            path="/foodlist/:id"
            component={FoodListScreen}
            exact
          ></Route>
           <Route
            path="/food/:id/edit"
            component={FoodEditScreen}
            
          ></Route>
         
 
      </main>
      <footer className="row center">Contact Us :&nbsp;<a href="tel:9822463038">9822463038</a>&nbsp;/&nbsp;<a href="tel:7038738722">7038738722</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Email : &nbsp;<a href="mailto:foodordering@gmail.com">foodordering@gmail.com</a></footer>
    </div>
    </BrowserRouter>
  );
}

export default App;