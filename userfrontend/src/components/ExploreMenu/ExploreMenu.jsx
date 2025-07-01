import {menu_list} from '../../assets/assets'
import './ExploreMenu.css'
import React,{useState} from 'react'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Explore our diverse menu, featuring everything from classic favorites to chef’s specials made with fresh ingredients.
            There’s a perfect dish waiting for you, whether you crave something hearty or light.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(category=>category===item.menu_name ?'All':item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?'active':' '} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu