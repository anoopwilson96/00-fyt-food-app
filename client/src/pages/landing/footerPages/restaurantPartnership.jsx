import { FaHandshake, FaStore } from 'react-icons/fa';

const RestaurantPartnerships = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaHandshake className="inline-block" /> Restaurant Partnerships</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Are you a restaurant looking to expand your customer base and grow your business? Partner with Fill Your Tummy! We offer restaurants a platform to showcase their menus and attract a wider audience. Enjoy seamless integration and logistical support while connecting with food lovers who crave your dishes.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaStore className="text-5xl text-primary" />
        <p className="text-lg mt-4">Join our network today and watch your restaurant flourish!</p>
      </div>
    </div>
  );
};
export default RestaurantPartnerships;
