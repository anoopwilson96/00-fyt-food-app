import { FaConciergeBell, FaTruck, FaUtensils } from 'react-icons/fa';

const Services = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaConciergeBell className="inline-block" /> Our Services</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        At Fill Your Tummy, we aim to provide a seamless and delightful food delivery experience. We partner with top-tier restaurants and ensure that each meal is crafted to perfection. From quick meals to gourmet dishes, FYT guarantees that you'll get your food fresh, hot, and on time!
      </p>
      <div className="flex justify-around mt-8">
        <div className="text-center">
          <FaTruck className="text-4xl mb-2 text-primary" />
          <p className="text-lg">Fast Delivery</p>
        </div>
        <div className="text-center">
          <FaUtensils className="text-4xl mb-2 text-primary" />
          <p className="text-lg">Wide Menu Options</p>
        </div>
        <div className="text-center">
          <FaConciergeBell className="text-4xl mb-2 text-primary" />
          <p className="text-lg">Exceptional Service</p>
        </div>
      </div>
    </div>
  );
};
export default Services;
