import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarRating } from '../../components/rating';
import { useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { axiosInstance } from '../../config/axiosInstance';


export const MenuItem = () => {

  const [restaurants, setRestaurants] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const menuRestaurant = async () => {
      try {
        const response = await axiosInstance({
          url: `/menu-item/get/${id}`,
          method: "GET",
        });
        setRestaurants(response?.data?.data?.restaurant);
        console.log(response?.data?.data?.restaurant); // Log the correct data
      } catch (error) {
        console.error("Error fetching restaurant data:", error); // Handle the error
      }
    };

    menuRestaurant(); 
  }, [id]); 



  return (




    <>
 
 <main className="flex-1 p-10 max-w-full mx-auto">
 <Link to={"/user"} ><IoArrowBackCircleOutline size={30} /></Link>
  <section className="section1 flex-1 p-10 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1  md:grid-cols-3 gap-5">



   { restaurants.map((value)=>(       
    <div className="card  bg-base-100 shadow-lg max-h-96 max-w-96 sm:max-h-80 sm:max-w-80 md:max-h-80 md:max-w-80">
              <Link to={`restaurant/${value?._id}`} >
              <img className=" rounded-t-lg object-contain" src={value?.image} alt="Restaurant 2" /> </Link>
              
              <div className="p-4">
                <div className='flex flex-row justify-evenly items-center'>
                <Link to={`restaurant/${value?._id}`} >
                <h3 className="text-lg text-wrap font-semibold ">{value?.name} </h3> </Link>
                
                <StarRating stars={value?.rating} />
                </div>

                
                <div className="flex align-middle justify-between gap-3 mt-3">
                  
                  <p className='flex sm:text-wrap md:text-wrap  lg:text-nowrap  items-center flex-row '> <MdDeliveryDining size={30}  />  Free Delivery</p>
                  <p className='flex sm:text-wrap md:text-wrap  lg:text-nowrap  items-center flex-row ' ><MdLocalOffer size={20} />  Explore Offers </p>                 
                </div>
              </div>
            </div>
   ))
   }



  
 
  </section>
 </main>

    </>
  )
}
