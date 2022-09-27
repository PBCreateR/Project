import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ForgetPasswordScreen(props) {
  
  // const [mobileNo,setMobileNumber] = useState('');
  // const [password, setPassword] = useState('');
  const [email,setEmail] = useState('');

  // const redirect = props.location.search
  //   ? props.location.search.split('=')[1]
  //   : '/';

  const userForgetPassword = useSelector((state) => state.userForgetPassword);
  const { userInfo, loading, error } = userForgetPassword;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(forgetPassword(email));
      alert("Your password is sent to registered Email");
     props.history.push('/signin');
  };
  // useEffect(() => {
  //   // if (userInfo) {
  //   //   props.history.push(redirect);
  //   // }

  // }, [props.history,  userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Forget Password</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Enter email  for Security check</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Registered Email "
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        {/* <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter New password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div> */}

        <div>
          <label />
          <button className="primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}