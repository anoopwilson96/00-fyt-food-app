import React, { useEffect, useState, Component } from 'react';
import { MenuItemsCard } from '../../components/menuItemsCard';
import { RestaurantsCard } from '../../components/restaurantsCard';
import { getAllMenuItems } from '../../services/menuItemsAPI';
import toast from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllRestaurants } from '../../services/restaurantAPI';


export const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerPadding: "60px",
    slidesToShow: 10,
    slidesToScroll: 5,
    initialSlide: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow:3,
          slidesToScroll:3
        }
      }
    ]
  };



const [menuItems,setMenuItems]= useState([{}])
const [restaurants,setRestaurants]= useState([{}])

useEffect(()=>{
  const getData = async () => {
    try {
     // Restaurant fetch
    const restaurantData = await getAllRestaurants();
    if(restaurantData){
      setRestaurants(restaurantData);
      console.log(restaurantData)
    }
    else{
      toast.error("Failed to fetch data")
      console.log(error)
    }
     
     
      // Menu Item fetch
    const menuItemData = await getAllMenuItems();
      if (menuItemData) {
        setMenuItems(menuItemData); // Accessing the data property here
        console.log(menuItemData); // Log the menu items array
      } else {
        toast.error("No data received");
      }
    } catch (error) {
      toast.error("Error in fetching data");
      console.log(error);
    }
  };


  getData();
}, []);




  return (
<div className="flex flex-col mx-auto">


  <main className="flex-1 p-10 max-w-full mx-auto">
    <section>
      <div className='w-full slider-container'>
      <Slider {...settings}>
      {menuItems.map((value) => (
              <MenuItemsCard key={value._id} items={value} />
            ))}
          
      </Slider>
      </div>
      </section>
      </main>
      <main className="flex-1 p-10 max-w-7xl mx-auto">
      <section>
      <h2 className="text-3xl font-bold text-left mb-6">Fastest near you</h2>
          
      <div className="Restaurants grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1  md:grid-cols-3 gap-5 mx-auto">
      
      {restaurants.map((value)=>(
         <RestaurantsCard key={value._id} restaurant={value} />
      ))}
          

      </div>

    </section>
  </main>
</div>
  );
};
