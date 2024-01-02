import React,{ useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {deleteAccount} from './redux/reducers/api-reducers'

import { useParams } from 'react-router-dom';
function DataUser() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products)
  const {userLogin} = products;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const storedDataUserLogin = localStorage.getItem('userLogin');
    const parsedDataUserLogin = storedDataUserLogin ? JSON.parse(storedDataUserLogin) : null;
  
    if(!parsedDataUserLogin.email){
      navigate('/')
    }
   
  },[userLogin])
  return (
    <div className='data-user-container'>
      <div className='data-user'>
        <h3>Email</h3>
        <p>{userLogin.email}</p>
      </div>
      <div className='data-user'>
        <h3>First Name</h3>
        <p>{userLogin.firstName}</p>
      </div>
      <div className='data-user'>
        <h3>Last Name</h3>
        <p>{userLogin.lastName}</p>
      </div>
      <div className='data-user'>
        <h3>Address</h3>
        <p>{userLogin.address}</p>
      </div>

      <button className='delete-account' onClick={()=>{dispatch(deleteAccount(userLogin.id))}}>delete account</button>
    </div>
  )
}

export default DataUser