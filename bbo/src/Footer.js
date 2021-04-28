import React from 'react'
import "./Footer.css";

function Footer() {
    return (
        <div className='footer'>
            <div className="footer_info">
                <strong>Address</strong>
                <p>12th Cross Anna Salai</p>
                <p>Sholinganallur Chennai</p>
                <p>635123</p>
            </div>
            <div className="footer_info">
                <strong>Contact Us</strong>
                <p>bbo@asd.com</p>
                <p>9452347582</p>
            </div>
            <div className="footer_info">
                <strong>Working Days</strong>
                <p>Week Days</p>
                <p>8am to 8pm</p>
            </div>
        </div>
    )
}

export default Footer
