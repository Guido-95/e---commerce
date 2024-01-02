import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {login,setErrorFalse} from './redux/reducers/api-reducers'
const Login = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.products)
  const {formError,userLogin} = products;
  const dispatch = useDispatch();
  // Stato per gestire i dati del form
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });
  useEffect(()=>{
    dispatch(setErrorFalse());
  },[])
  useEffect(()=>{
    if(userLogin.email){
      navigate('/')
    }
  },[userLogin])
  // Funzione per gestire i cambiamenti nei campi del form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)) 
  };

  return (
    <>
    <div className="form-register">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}> 
          <label>
              Email:
              <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              />
          </label>
          <label className='label-email-register'>
              Password:
              <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              />
              {formError && <div className='error-form'>Incorrect data entered</div> }
          </label>
          <button type="submit">Login</button>
      </form>
    </div>
   
  
    </>

  
  );
};

export default Login;
