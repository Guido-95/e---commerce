import React from 'react'
import { Link } from 'react-router-dom'
function ErrorScreen() {
  return (
    <div class="error-container">
        <h1>Error 404</h1>
        <p>The page you are looking for is not available.</p>
        <p>Back to the <Link className='error-link' to={"/"}>home page </Link></p> 
    </div>
  )
} 

export default ErrorScreen