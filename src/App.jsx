import { useState,useEffect } from 'react'
import { Link  } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { fetchData,setPopupCart } from './redux/reducers/api-reducers'
import Loader from './components/Loader';

import './App.css'

function App() {
  const products = useSelector(state => state.products)
  const {product,loader,popupCart,isPopupCart} = products;

  const dispatch = useDispatch();
  const [itemInCart , setItemsInCart] = useState(Object.keys(popupCart).length)
  let menClothingFilter = product.filter(product=> product.category === "men's clothing")
  let womenClothingFilter = product.filter(product=> product.category === "women's clothing")
  let jeweleryFilter = product.filter(product=> product.category === "jewelery")
  let electronicsFilter = product.filter(product=> product.category === "electronics")
  useEffect(()=>{

    dispatch(fetchData());
    setItemsInCart(Object.keys(popupCart).length);
  
  },[])
  return (
    <div className="app">
      {itemInCart > 0 && <div className='popupCart'><img className='img-cart-popup' src={popupCart.image}/> You have added to cart <span className='bold'>{popupCart.title}</span>  <Link to={'/cart'} className='add-cart'>Go to the cart</Link></div> }
      <h1>Featured products</h1>
      {loader ? <Loader/> : <div className='product-home'>
      <h2>men's clothing</h2>
      <section className="articles">
        {menClothingFilter.map(el=>{
            return  <div key={el.id} className='product-container'><Link   to={`/product/${el.id}` }><img className='product-img' src={el.image} /> </Link> </div>
          })}
      </section>
      <h2>women's clothing</h2>
      <section className="articles flex-wrap">
          {womenClothingFilter.map(el=>{
              return  <div key={el.id} className='product-container'><Link   to={`/product/${el.id}` }><img className='product-img' src={el.image} /> </Link> </div>
            })}
      </section>
      <h2>jewelery</h2>
      <section className="articles">
          {jeweleryFilter.map(el=>{
              return  <div key={el.id} className='product-container'><Link   to={`/product/${el.id}` }><img className='product-img' src={el.image} /> </Link> </div>
            })}
      </section>
      <h2>electronics</h2>
      <section className="articles flex-wrap">
          {electronicsFilter.map(el=>{
              return  <div key={el.id} className='product-container'><Link   to={`/product/${el.id}` }><img className='product-img' src={el.image} /> </Link> </div>
            })}
      </section>
      </div> }
  
    </div>
       
   
  )
}

export default App
