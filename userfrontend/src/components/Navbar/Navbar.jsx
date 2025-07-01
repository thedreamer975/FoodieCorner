import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ ShowLogin, SetShowLogin, darkMode, setDarkMode }) => {
    const [menu, setMenu] = useState("home");
    const { getTotal, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken && setToken(""); // Only call if setToken exists in context
        navigate && navigate('/');
    };

    return (
        <div className='navbar'>
            <Link to='/' onClick={() => setMenu("home")}>
                <div className="logo-box">
                    <img className='logo' src={assets.my_logo} alt="Logo" />
                </div>
            </Link>
            <ul className='nav-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu'>
                    <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
                </a>
                <a href='#footer'>
                    <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</li>
                </a>
            </ul>
            <div className="Navbar-right">
                <div className="Navbar-basket-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotal() !== 0 ? 'dot' : ''}></div>
                </div>
                {
                    !token ?
                        <button onClick={() => SetShowLogin(true)}>Sign in</button>
                        :
                        <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="Profile" />
                            <ul className='nav-profile-dropdown'>
                                <Link to="/myorders"><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></Link>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                            </ul>
                        </div>
                }
                {/* Dark mode toggle button */}
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  style={{
                    marginLeft: "16px",
                    padding: "6px 16px",
                    borderRadius: "20px",
                    border: "1px solid var(--theme-color)",
                    background: "none",
                    color: "var(--theme-color)",
                    cursor: "pointer"
                  }}
                >
                  {darkMode ? "🌙 Dark" : "☀️ Light"}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
