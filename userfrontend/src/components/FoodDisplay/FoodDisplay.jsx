import React,{useContext} from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodCard from '../FoodCard/FoodCard'
import './FoodDisplay.css'

const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near u</h2>
        <div className="food-display-list">
            {
                food_list.map((item,index)=>{
                    if(category==="All" || category===item.category)
                    return (
                        <FoodCard id={item._id} name={item.name} image={item.image} description={item.description} price={item.price} key={index} />
                    ) })
            }
        </div>
    </div>
  )
}

export default FoodDisplay