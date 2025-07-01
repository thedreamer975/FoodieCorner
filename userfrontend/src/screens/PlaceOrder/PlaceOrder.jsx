import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotal, food_list, Cartitem, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: ""
  });

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle order submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let orderItem = [];
    food_list && food_list.forEach((item) => {
      if (Cartitem[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo.quantity = Cartitem[item._id];
        orderItem.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItem,
      amount: getTotal() + 20
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      const { session_url } = response.data;
      window.location.replace(session_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotal() === 0) {
      navigate('/cart');
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <form className='place-order' onSubmit={onSubmitHandler}>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="first_name"
            value={data.first_name}
            onChange={onChangeHandler}
            placeholder='First Name'
            required
          />
          <input
            type="text"
            name="last_name"
            value={data.last_name}
            onChange={onChangeHandler}
            placeholder='Second Name'
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder='Email Address'
          required
        />
        <input
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder='Street'
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder='City'
            required
          />
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder='State'
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder='Country'
            required
          />
          <input
            type="text"
            name="zip_code"
            value={data.zip_code}
            onChange={onChangeHandler}
            placeholder='Zip code'
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder='Phone Number'
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>₹{getTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery charges</p>
              <p>₹{getTotal() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotal() === 0 ? 0 : getTotal() + 20}</p>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
