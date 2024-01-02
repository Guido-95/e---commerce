import React ,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {updateCart,setBuyCompleteToFalse} from './redux/reducers/api-reducers'
import BraintreeDropIn from './BraintreeDropIn';
import Loader from './components/Loader';
function Cart() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const [loading, setLoading] = useState(false);
    const {userLogin,cart,buyComplete,popupCart,feedbackPayment} = products;
    const [total, setTotal] = useState(0);

    let userCart= cart.filter(product=> product.userId === userLogin.id)

    useEffect(()=>{
        setTotal(()=>{
            let newTotal = 0;
            cart.filter(product=> product.userId === userLogin.id).forEach(product => {
                newTotal += product.price * product.quantity;
            });
            return newTotal;
        })
        if(buyComplete === true) {
            setTimeout(() => {
                dispatch(setBuyCompleteToFalse('buyComplete'))
                
            }, 2000);
        }
        if(cart.filter(product=> product.userId === userLogin.id).length > 0) {
            dispatch(setBuyCompleteToFalse('removeFeedBack'))
        }
    },[cart,buyComplete])

    return (
        <div className="cart">
            {feedbackPayment && <div className='purchase-complete'>Purchase completed <Link to={'/orders'} className='button-feedback'> Your orders </Link></div> }
            {(!buyComplete && !feedbackPayment) && <h1>Cart</h1>}
            {(cart.filter(product=> product.userId === userLogin.id).length === 0 && !feedbackPayment && !buyComplete) &&  <div className='cart-empty'> cart is empty, <Link to={'/'} className='button-feedback'>Go to the shop</Link> </div> }
            {buyComplete && <Loader/>}
            {!buyComplete && userCart.map(product=>{
               
                return  <div className='cart-products' key={product.id}>
                            <div className="img-quantity">
                                <div className="remove" onClick={()=>dispatch(updateCart({id:product.id,action:'remove'}))}>
                                    -
                                </div>
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt="" /> 
                                </Link>

                                <div className="add" onClick={()=>dispatch(updateCart({id:product.id,action:'add'}))}>
                                    +
                                </div>
                            </div>
                            <div className="add-remove-mobile">
                                <div className="remove-mobile" onClick={()=>dispatch(updateCart({id:product.id,action:'remove'}))}>
                                    -
                                </div>
                                <div className="add-mobile" onClick={()=>dispatch(updateCart({id:product.id,action:'add'}))}>
                                    +
                                </div>
                            </div>
                            <div className="product-detail-cart">
                                <div className="name-product-card">
                                    <h2>{product.title} </h2> 
                                </div>
                                <div className="quantity price-cart">
                                    <p>{product.price} $</p>
                                    <p>Quantity: {product.quantity}</p> 
                                </div>
                                <div className="remove-item" onClick={()=>dispatch(updateCart({id:product.id,action:'delete'}))}>
                                    Remove
                                </div>
                            </div>
                                
                          
                        </div>
            })}
            {!buyComplete && userCart.length >=1 &&<div className="total-cart">

                {total.toFixed(2)}$

            </div>}
            
            {!buyComplete && userCart.length >=1 && <BraintreeDropIn total={total} tokenizationKey={'sandbox_q7372q9k_2rk42vktxgh2kbqr'}/>}
        </div>
    )
}

export default Cart