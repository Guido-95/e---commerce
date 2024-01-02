import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {saveDataUser,verifyLogin,setErrorFalse } from './redux/reducers/api-reducers'
import { Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.products)
  const {formError,userLogin,userData} = products;
  const dispatch = useDispatch();
  const storedDataUser = localStorage.getItem('registrationData');
  const parsedDataUser = storedDataUser ? JSON.parse(storedDataUser) : null;
  const [users, setUsers] = useState(parsedDataUser || [] )
  // Stato per gestire i dati del form
  const [formData, setFormData] = useState({
    email:'',
    firstName: '',
    lastName: '',
    password:'',
    address: '',
    phoneNumber: '',
  });

  // Funzione per gestire i cambiamenti nei campi del form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(()=>{
    dispatch(setErrorFalse());
  },[])
  useEffect(()=>{
    
    if(userLogin.email){
      navigate('/')
    }
  },[userLogin])
  // Funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Puoi anche resettare lo stato del form dopo l'invio se lo desideri
    setFormData({
        email:'',
        firstName: '',
        lastName: '',
        password:'',
        address: '',
        phoneNumber: '',
    });
    // salva i dati dell'utente
    dispatch(saveDataUser(formData))
  };

  return (
    <>
    <div className="form-register">
    <h1>Create account</h1>
      <form onSubmit={handleSubmit}> 
          <label className='label-email-register'>
              Email:
              <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              />
            {formError && <div className='error-form'>Email already used</div> }
          </label>
          <label>
              Password:
              <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              />
          </label>
          <label>
          FirstName:
              <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              />
          </label>

          <label>
          LastName:
              <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              />
          </label>
          <label>
          Address:
              <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              />
          </label>
{/* 
          <label>
              Cellulare:
              <input
              type="tel"
              name="phoneNumber"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              />
              <small>Inserisci un numero di telefono a 10 cifre.</small>
          </label> */}

          <button type="submit">Register</button>
      </form>
      <Link className='button' to={ '/login'}>
        Do you already have an account? login here
      </Link>
    </div>
    
    </>

  
  );
};

export default Register;
