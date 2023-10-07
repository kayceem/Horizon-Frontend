import React from 'react'
import './Footer.scss';
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from 'react-icons/bs';

const Footer = () => {
  return (
    
    <footer class="footer">
      
        <div class="container">
          <div class="row mb-5">
            <div class="col-md-4">
              <div class="site-logo">
                <a >Horizon</a>
              </div>
            </div>
            <div class="col-md-8 text-md-right">
              <ul class="list-unstyled social-icons">
                {/* < */}
                <BsFacebook size={26}/>
                <BsInstagram size={26}/>
                <BsTwitter size={26}/>
                <BsLinkedin size={26}/>
              </ul>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-md-6 ">
              <ul class="nav-links list-unstyled nav-left">
                <li><a >Privacy</a></li>
                <li><a >Policy</a></li>
              </ul>
            </div>
            <div class="col-md-6 text-md-right">
              <ul class="nav-links list-unstyled nav-right">
                <li><a >Home</a></li>
                <li><a >FAQ</a></li>
                <li><a >Support</a></li>
                <li><a >About</a></li>
                <li><a >Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col ">
              <div class="copyright">
                <p><small>Copyright 2023. All Rights Reserved.</small></p>
              </div>
            </div>
          </div>
        
      </div>
    </footer>
  )
}

export default Footer;