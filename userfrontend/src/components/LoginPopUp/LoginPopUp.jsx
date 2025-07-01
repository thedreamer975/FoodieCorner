import React, { useState, useContext } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopUp = ({ SetShowLogin }) => {
    const { url, token, setToken } = useContext(StoreContext);

    const [CurState, SetCurState] = useState('sign in');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (CurState === "sign in") {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }
        try {
            const response = await axios.post(newUrl, data);
            if (CurState === "sign up") {
                toast.success("Account created successfully! Please sign in");
                SetCurState("sign in");
            } else {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                SetShowLogin(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onSubmitHandler}>
                <div className="login-popup-title">
                    <h2>{CurState}</h2>
                    <img onClick={() => SetShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-inputs">
                    {CurState !== 'sign in' ? (
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder='User Name'
                            required
                        />
                    ) : null}
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder='Email'
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder='Password'
                        required
                    />
                    <button className="btn" type="submit">
                        {CurState}
                    </button>
                </div>
                <div className="login-popup-condn">
                    <input type="checkbox" required />
                    <p>
                        By clicking this I accept terms &amp; privacy policy of FoodieCorner
                    </p>
                </div>
                {
                    CurState === 'sign in'
                        ? <p>Create a new account? <span onClick={() => SetCurState('sign up')}>click here</span></p>
                        : <p>Already have an account? <span onClick={() => SetCurState('sign in')}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopUp;
