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
          <Route path="/" element={<App />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user/:id" element={<DataUser />} />
          <Route path='*' element={<ErrorScreen />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
