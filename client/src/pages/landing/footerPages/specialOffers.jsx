import { FaGift, FaTags } from 'react-icons/fa';

const SpecialOffers = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaGift className="inline-block" /> Special Offers</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Who doesn't love a good deal? At Fill Your Tummy, we offer a range of exciting discounts and promotions on your favorite meals. Keep an eye out for seasonal offers, coupon codes, and daily deals that will help you satisfy your cravings while saving money.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaTags className="text-5xl text-primary" />
        <p className="text-lg mt-4">Check our latest offers and start saving today!</p>
      </div>
    </div>
  );
};
export default SpecialOffers;
