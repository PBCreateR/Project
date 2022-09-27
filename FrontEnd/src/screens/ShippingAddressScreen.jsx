import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios';
export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [pincode, setPinCode] = useState(shippingAddress.pincode);
  const [state, setState] = useState(shippingAddress.state);
  const dispatch = useDispatch();
  //const [state, setState] = useState(shippingAddress.state);
  // useEffect(() => {
  //       axios
  //       .get("https://cdndemo-api.co-vin.in/api/v2/admin/location/states")
  //       .then((response) => {
  //         console.log(response.data );
  //         // if response.data is an type of an object use this
  //         setState(response.data);
  //    });
  // }, []);



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, pincode, state })
    );
    props.history.push('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={pincode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          ></input>
        </div>
        {/* <div>
      <select
      >
        click
        <option value="">State</option>

       {/* Your mapping */}

      {/* {state && state.states.map((value) => {
        return (
         
            <option value={value.state_name} key={value.state_id}>{value.state_name}</option>
          
        );
      })}
       </select>
  </div>  */}
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}