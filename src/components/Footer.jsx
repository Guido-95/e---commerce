import React from 'react'
import logo from '../assets/logo2.png'
function Footer() {
  return (
    <footer>
        <div className="logo-footer">
            <img className='logo-img' src={logo} alt="" />
        </div>
        <div className="footer-bottom">
            <div className='fake-links-footer'>
                <div className='fake-link-footer'>
                    <h5>work with us</h5>
                    <p>discover the benefits of collaboration</p> 
                </div>
                <div className='fake-link-footer'>
                    <h5>do you want to sell with us?</h5>
                    <p>Become a seller , learn more</p> 
                </div>
                <div className='fake-link-footer'>
                    <h5>outlets around the world</h5>
                    <p>Search for one of our stores near you </p>
                </div>
                <div className='fake-link-footer'>
                    <h5>always-on assistance</h5>
                    <p>For any problem ask our assistants</p>
                </div>
            </div>
       
        </div>
    </footer>
  )
}

export default Footer