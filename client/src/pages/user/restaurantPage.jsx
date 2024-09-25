import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneRestaurant } from '../../services/restaurantAPI';
import toast from 'react-hot-toast';
import { StarRating } from '../../components/rating';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdLocalOffer, MdDeliveryDining } from "react-icons/md";
import { DishesCard } from '../../components/dishesCard';

export const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const response = await getOneRestaurant(id);
        setRestaurant(response);
        console.log(response)
      } catch (error) {
        console.log(error, "=== Failed to fetch");
        toast.error("Error in loading data");
      }
    };

    getRestaurantData();
  }, [id]);

  return (
    <main className=''>
      {/* <Link to={"/user"} ><IoArrowBackCircleOutline size={30} /></Link> */}
     
      <section className="grid lg:grid-cols-2 grid-cols-1 max-w-7xl mx-auto gap-8 p-6 ">
        <div className="card bg-base-100 shadow-lg rounded-lg overflow-hidden">
          <figure className="flex justify-center items-center bg-green-50 p-2">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={restaurant?.image}
              alt="restaurant"
            />
          </figure>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{restaurant?.name}</h2>
            <div className="mt-5">
              <StarRating stars={restaurant?.rating} />
            </div>
          </div>
          <p className="text-lg text-gray-600">{restaurant?.cuisine}</p>
          <p className="flex items-center gap-1 text-gray-600">
            <MdDeliveryDining size={30} /> Quick Delivery
          </p>
          <p className="flex items-center gap-1 text-gray-600">
            <MdLocalOffer size={28} /> Discounted price
          </p>
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="section1 flex-1 p-10 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 md:grid-cols-3 gap-5">
        {restaurant?.menuItems?.map((menuItem) =>
          menuItem.dish.map((dish) => (

            <DishesCard key={dish._id} restaurantId={restaurant._id} dish={dish} />
          ))
        )}
      </section>
    </main>
  );
};

