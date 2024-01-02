import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { Link  } from "react-router-dom";
function Orders() {
  const products = useSelector(state => state.products)
  const {orders} = products;
  const {userLogin,cart} = products;
  const productUserLogin = orders.filter(order=> order.userId === userLogin.id);
  return (
    <div className='my-orders-page'>
      <h1>my orders</h1>
      {orders.length < 1 && <div className='cart-empty'> there are no orders <Link to={'/'} className='button-feedback'>Go to the shop</Link> </div> }
      {productUserLogin.map(order => (
        <div className='order' key={order.id}>
          <div className='order-user-info'>
            {/* <h2>Number order: {order.id}</h2> */}
            <h2>{userLogin.email}</h2>
            <p> TOTAL: {order.total.toFixed(2)}$</p>
          </div>

          <div className='container-order-product-info'>
            {/* <h3>Products</h3> */}
            
            {order.prodotti.map(product => (
              <section className='order-product-detail' key={product.title}>
                <div className="order-img">
                 <Link to={`/product/${product.id}`}><img src={product.image} alt="" /></Link> 
                </div>
                <div className="order-info">
                    <p>{product.title}</p>
                    <p>Quantity: {product.quantity}</p>
                </div>
              
              </section>
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}

export default Orders

