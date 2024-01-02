import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ProductDetail from './ProductDetail.jsx'
import ErrorScreen from './ErrorScreen.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Cart from './Cart.jsx'
import Orders from './Orders.jsx'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import DataUser from './DataUser.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="https://e-commerce-portfolio-site.netlify.app" element={<App />} />
          <Route path="https://e-commerce-portfolio-site.netlify.app/product/:id" element={<ProductDetail />} />
          <Route path="https://e-commerce-portfolio-site.netlify.app/register" element={<Register />} />
          <Route path="https://e-commerce-portfolio-site.netlify.app/login" element={<Login />} />
          <Route path="https://e-commerce-portfolio-site.netlify.app/cart" element={<Cart />} />
          <Route path="https://e-commerce-portfolio-site.netlify.app/orders" element={<Orders />} />
          <Route path="https://e-commerce-portfolio-site.netlify.app/user/:id" element={<DataUser />} />
          <Route path='*' element={<ErrorScreen />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
