import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
    <div className="header-content">
        <h1>Order your favourite food here</h1>
        <h2>Savor the Flavors of Fresh, Homemade Goodness</h2>
        <p>At FoodieCorner, we serve delicious, fresh meals made from the finest ingredients. 
        Quality and taste come first, ensuring every bite is a flavorful experience you’ll love.
        Discover our chef-curated menu featuring seasonal ingredients and authentic recipes crafted with love.</p>
      <a href="#explore-menu"><button>View Menu</button></a>
    </div>
     </div>
  )
}

export default Header