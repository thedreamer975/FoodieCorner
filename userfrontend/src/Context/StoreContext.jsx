import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [Cartitem, setcartitem] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = 'http://localhost:4000';

    // Fetch food list from API
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + '/api/food/list');
            setFoodList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Load cart data from API
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            setcartitem(response.data.cartData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
        // eslint-disable-next-line
    }, []);

    const addToCart = async (itemid) => {
        if (!Cartitem[itemid])
            setcartitem({ ...Cartitem, [itemid]: 1 });
        else
            setcartitem({ ...Cartitem, [itemid]: Cartitem[itemid] + 1 });

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId: itemid }, { headers: { token } });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const removeCart = async (itemid) => {
        setcartitem({ ...Cartitem, [itemid]: Cartitem[itemid] - 1 });

        if (token) {
            try {
                await axios.delete(`${url}/api/cart/remove?itemId=${itemid}`, { headers: { token } });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getTotal = () => {
        let total = 0;
        for (let item in Cartitem) {
            if (Cartitem[item] > 0) {
                let itemInfo = food_list.find(food => food._id === item);
                if (itemInfo) {
                    total += itemInfo.price * Cartitem[item];
                }
            }
        }
        return total;
    };

    const values = {
        food_list,
        Cartitem,
        setcartitem,
        addToCart,
        removeCart,
        getTotal,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={values}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
