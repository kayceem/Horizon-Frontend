import React from 'react'
import './Footer.scss';
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from 'react-icons/bs';

const Footer = () => {
  return (
    
    <footer className="footer">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4">
              <div className="site-logo">
                <a >Horizon</a>
              </div>
            </div>
            <div className="col-md-8 text-md-right">
              <ul className="list-unstyled social-icons">
                {/* < */}
                <BsFacebook size={26}/>
                <BsInstagram size={26}/>
                <BsTwitter size={26}/>
                <BsLinkedin size={26}/>
              </ul>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-6 ">
              <ul className="nav-links list-unstyled nav-left">
                <li><a >Privacy</a></li>
                <li><a >Policy</a></li>
              </ul>
            </div>
            <div className="col-md-6 text-md-right">
              <ul className="nav-links list-unstyled nav-right">
                <li><a >Home</a></li>
                <li><a >FAQ</a></li>
                <li><a >Support</a></li>
                <li><a >About</a></li>
                <li><a >Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col ">
              <div className="copyright">
                <p><small>Copyright 2023. All Rights Reserved.</small></p>
              </div>
            </div>
          </div>
        
      </div>
    </footer>
  )
}

export default Footer;