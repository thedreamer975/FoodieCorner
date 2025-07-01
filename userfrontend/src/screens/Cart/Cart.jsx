import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { Cartitem, food_list, addToCart, removeCart, getTotal, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Modify</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((food, index) => {
            if (Cartitem[food._id] > 0) {
              return (
                <React.Fragment key={food._id}>
                  <div className="cart-items-title cart-items-item">
                    <img className="food-image" src={`${url}/image/${food.image}`} alt="" />
                    <p>{food.name}</p>
                    <p>{food.price}</p>
                    <p>{Cartitem[food._id]}</p>
                    <p>{Cartitem[food._id] * food.price}</p>
                    <div className="cart-counter food-item-counter">
                      <img
                        onClick={() => removeCart(food._id)}
                        src={assets.remove_icon_red}
                        alt=""
                      />
                      <p>{Cartitem[food._id]}</p>
                      <img
                        onClick={() => addToCart(food._id)}
                        src={assets.add_icon_green}
                        alt=""
                      />
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              )
            }
            return null;
          })
        }
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotal() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotal() === 0 ? 0 : getTotal() + 20}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Pay</button>
        </div>
        <div className="cart-promo">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promo-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
