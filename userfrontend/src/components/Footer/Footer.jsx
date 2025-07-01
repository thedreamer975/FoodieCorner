import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left">
            <img className='logo' src={assets.my_logo} alt="" />
            <p className="content">At FoodieCorner, we serve delicious, fresh meals made from the finest ingredients. 
        Quality and taste come first, ensuring every bite is a flavorful experience you’ll love.
        Discover our chef-curated menu featuring seasonal ingredients and authentic recipes crafted with love.</p>
        <div className="socials">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-center">
            <h2>FoodieCorner</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Services</li>
                <li>Reviews</li>
            </ul>
        </div>
        <div className="footer-right">
            <h2>Get in touch</h2>
            <ul>
                <li>+91 987654321</li>
                <li>FoodieCorner@gmail.com</li>
            </ul>
        </div>
        </div>
        <hr />
        <p className='footer-copy-right'>Copyrights 2025 @ FoodieCorner. All rights reserved </p>
    </div>
  )
}

export default Footer