import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './FoodCard.css';
import { StoreContext } from '../../Context/StoreContext';

const FoodCard = ({ id, name, image, description, price }) => {
  const { Cartitem, setcartitem, addToCart, removeCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* Use url for image if available, else fallback to direct image */}
        <img
          src={url ? `${url}/image/${image}` : image}
          alt=""
          className="food-item-img"
        />
        {
          !Cartitem[id] ? (
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              className="add"
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img onClick={() => removeCart(id)} src={assets.remove_icon_red} alt="" />
              <p className="food-count">{Cartitem[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <p className="item-name">{name}</p>
        <p className="item-desc">{description}</p>
        <div className="food-price-ratings">
          <p className="item-price">₹{price}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
