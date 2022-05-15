import React from 'react'
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

import '../css/Footer.css'


function Footer() {
  return (

    <footer class="page-footer font-small blue footer navbar-fixed-bottom main-footer">

<div class="social-info text-center "><FaFacebook /><FaTwitter /><FaLinkedinIn/></div>
    <div class="footer-copyright text-center ">
      © 2022 Copyright:
      <a href="/" style={{ color:"slategrey" ,fontWeight:400 }}> EShoppingZone</a>
    </div>
    
  
  </footer>
  
  


  )
}

export default Footer
