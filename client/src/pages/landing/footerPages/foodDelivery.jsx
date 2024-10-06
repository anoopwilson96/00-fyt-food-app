import { FaHamburger, FaPizzaSlice, FaLeaf } from 'react-icons/fa';

const FoodDelivery = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaHamburger className="inline-block" /> Food Delivery</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Hungry? We've got you covered! With a vast range of food options from burgers, pizzas, vegan delights, and much more, Fill Your Tummy makes it easier to order your favorite meals and have them delivered to your doorstep. Choose from our network of restaurants and enjoy a satisfying dining experience, wherever you are.
      </p>
      <div className="flex justify-around mt-8">
        <div className="text-center">
          <FaPizzaSlice className="text-4xl mb-2 text-primary" />
          <p className="text-lg">Hot Pizzas</p>
        </div>
        <div className="text-center">
          <FaHamburger className="text-4xl mb-2 text-primary" />
          <p className="text-lg">Juicy Burgers</p>
        </div>
        <div className="text-center">
          <FaLeaf className="text-4xl mb-2 text-primary" />
          <p className="text-lg">Vegan Options</p>
        </div>
      </div>
    </div>
  );
};
export default FoodDelivery;
