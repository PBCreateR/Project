import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNo,setMobileNo] = useState('');
//  const[role,setRole] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(firstName,lastName, email,gender, password,mobileNo));
    }
  };

  const options = [
    {value: '', text: '--Choose an option--'},
    {value: 'Male', text: 'Male'},
    {value: 'Female', text: 'Female '},
    {value: 'Other', text: 'Other'},
  ];


  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="firstname">FirstName</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter firstname"
            required
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="lastname">LastName</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter lastname"
            required
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
         {/* <div>
           <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            placeholder="Enter gender"
            required
            onChange={(e) => setGender(e.target.value)}
          ></input> 
           </div> */}
         <div>
        <label for="gender">Choose gender</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div> 

        <div>
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            placeholder="Enter Mobile Number"
            required
            onChange={(e) => setMobileNo(e.target.value)}
          ></input>
        </div>
        {/* <div>
          <label htmlFor="role">role</label>
          <input
            type="text"
            id="role"
            
            onChange={(e) => setRole(e.target.value)}
          ></input>
        </div> */}

        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}