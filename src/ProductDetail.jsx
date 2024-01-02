import React from 'react'
import {useEffect,useState } from 'react'
import {useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { fetchSingleProduct,addCart,setPopupCart } from './redux/reducers/api-reducers'
import {useSelector,useDispatch} from 'react-redux';
import Loader from './components/Loader';
import { useNavigate } from 'react-router-dom';
function ProductDetail() {
  const navigate = useNavigate();
  const products = useSelector(state => state.products)
  const {productDetail,userLogin,loader,cart} = products;
  const dispatch = useDispatch();
  const {id} = useParams();
  const [popupCart,setPopupWhenAddCart] = useState(false);
  useEffect(()=>{
    dispatch(fetchSingleProduct(id))
    // console.log(products)
    setPopupCart(false)
  },[])
  useEffect(()=>{
    if(popupCart === true){
      setPopupWhenAddCart(false);
      dispatch(setPopupCart(productDetail));
      navigate('/');

    }
  },[popupCart])
  return (
    <>
    {loader ? <Loader/> : <div className='container-product-detail'>
        <div className='product-detail'>
            <div className="container-img-product-detail">
              <img className='img-product-detail' src={productDetail.image} alt="img-product" />
            </div>
          <div className="title-price-description">
            <div className="title">
            <h2>{productDetail.title} </h2> 

            </div>
            <div className="description">
              {productDetail.description}
            </div>
            <div className='container-price-add-cart'>
              <div className="price">
                {productDetail.price} $
              </div>
              {userLogin.email && <div onClick={()=>{dispatch(addCart(productDetail)); setPopupWhenAddCart(true)}} className="add-cart">Add to cart</div>}
              {!userLogin.email && <Link to={'/login'} onClick={()=>dispatch(addCart(productDetail))} className="add-cart">login for buy</Link>}
            </div>
          
          </div>
      </div>
    
      
    </div>}
    </>
  )
}

export default ProductDetail