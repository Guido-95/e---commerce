import React ,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {quit,verifyLogin,verifyUsersLogin} from '../redux/reducers/api-reducers'
import logo from '../assets/logo2.png'
import cartImage from '../assets/cart-image.png'
import {useSelector,useDispatch} from 'react-redux';
function Header() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products)
  const {cart,userData,userLogin} = products;
  // const [userLogin, setUserLogin] = useState({});
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [optionsMobile, setOptionsMobile] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const showPopup = () => {
    setPopupVisibility(true);
  };
  const logout = () =>{
    dispatch(quit())
    navigate('/')

  }
  const hidePopup = () => {
    setPopupVisibility(false);
  };
  function togglePopup() {
    // Ottieni il riferimento al popup
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("popub-mobile-visible");
    // setOptionsMobile((prev) => !prev);
    
  };
  useEffect(()=>{
    dispatch(verifyLogin());
    let popup = document.getElementById("myPopup");
    if(popup.style.display === 'none'){
      setOptionsMobile(false);
    }
    // let userLogin = userData.find(el => el.isLogin === true) || {};
    // dispatch(verifyUsersLogin(userLogin))
  },[])
  useEffect(()=>{
    if(userLogin.email){
      let cartIcon = document.getElementById('cart-icon');

      cartIcon.classList.add('cart-icon-animation');
 
      if (cartIcon.classList.contains('cart-icon-animation')) {
        setTimeout(function() {
    
          cartIcon.classList.remove('cart-icon-animation');
        }, 300);
      }
    }
 
   
  },[cart.length])
  return (
    <header>
     
      <Link className='home' to={`/`}> <img className='logo-img' src={logo} alt="" /></Link>
      {/* <!-- Icona Hamburger --> */}
      <div className={`hamburger-icon ${optionsMobile ? 'rotate' : 'no-rotate' }`} onClick={()=> togglePopup()}>☰</div>

      {/* <!-- Popup --> */}
      <div className="popup-mobile" id="myPopup">
        {/* <!-- Contenuto del popup --> */}
        <div className='close-popup-icon' onClick={()=> togglePopup()}> x </div>
        <div className={`user-logged-mobile ${optionsMobile ? 'visible' : 'no-rotate' }`}>
          Hello {userLogin.firstName}
        </div>
        {!userLogin.email && <div onClick={()=> togglePopup()} className='header-options-mobile'><Link to={'/register'}> Register</Link> </div> }
        {!userLogin.email && <div onClick={()=> togglePopup()} className='header-options-mobile'><Link to={'/login'}> Login</Link> </div> }
        {userLogin.email && <div onClick={()=>{logout(); togglePopup();}} className='header-options-mobile'>Logout</div> }
        {userLogin.email && <div  className='header-options-mobile' onClick={()=> togglePopup()}>
            <div className='quantity-cart-mobile'>
              {cart.filter(product=> product.userId === userLogin.id).length}
            </div> 
            <Link  to={'/cart'} className='header-options-mobile'>
              
              <img className='cart-logo' src={cartImage} alt="" /> 
              
            </Link>
          </div>  }
        {userLogin.email && <div className='header-options-mobile' onClick={()=> togglePopup()}><Link  to={'/orders'} > Orders </Link></div> }
        {userLogin.email && <div className='header-options-mobile' onClick={()=> togglePopup()}><Link  to={`/user/${userLogin.id}`} > Info </Link></div> }
      </div>
      
      {userLogin.email ? 
        <div className='container-header-options'>
          <div className="user-logged">
            Hello <span>{userLogin.firstName}</span>
          </div>
          <div className='header-options'>
            {userLogin.email && <div onClick={()=>logout()} className='logout'>Logout</div> }
          </div>
          <div  className='header-options'>
            <div id='cart-icon' className='product-in-cart-number'>
              {cart.filter(product=> product.userId === userLogin.id).length}
            </div> 
            {userLogin.email && <Link  to={'/cart'}   className='cart-header'>
                <img className='cart-logo' src={cartImage} alt="" /> 
              </Link> }
          </div>
          <div className='header-options'>{userLogin.email && <Link  to={'/orders'} className='cart-header'> Orders </Link> }</div>
          <div className='header-options'>{userLogin.email && <Link  to={`/user/${userLogin.id}`} className='cart-header'> Info </Link> }</div>
  
        </div>
       :   <div onMouseOver={showPopup} onMouseOut={hidePopup} className="register-login" >
            <Link className='login-header-link' to={`/login`}>hello, log in </Link> {isPopupVisible && (
            <div  className="popup">
              <Link to={ '/login'} className="login-button">
                Login
              </Link>
              <Link to={ '/register'} >
                Do not have an account? click here!
              </Link>
            </div>
            )}
          </div>}
    </header>
  )
}

export default Header