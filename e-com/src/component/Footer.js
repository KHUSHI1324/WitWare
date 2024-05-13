import React from 'react'

const Footer = () => {
    const year=new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-details-one">
            <h3>Get to known</h3>
            <p>About us</p>
            <p>Carrers</p>
            <p>Press Releases</p>
            <p>WitWare Cares</p>
        </div>
        <div className="footer-details-one">
            <h3>Connect with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p> 
        </div>
        <div className="footer-details-one forres">
            <h3>Make Money with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
        </div>
        <div className="footer-details-one forres">
            <h3>Make Money with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
      </div>
      </div>
      <div className="lastdetails">
      <h1>WitWare</h1>
      {/* <p className='link'> */}
   <p> Conditions of Use &nbsp;&nbsp;&nbsp;&nbsp; Privacy Notice&nbsp;&nbsp;&nbsp;&nbsp;   Consumer Health Data Privacy Disclosure  &nbsp;&nbsp;&nbsp;&nbsp; Your Ads Privacy Choices&nbsp;&nbsp;&nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
      {/* </p> */}
      </div>
    
    </footer>
  )
}

export default Footer
