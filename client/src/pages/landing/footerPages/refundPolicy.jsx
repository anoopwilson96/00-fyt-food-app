import { FaUndoAlt, FaMoneyBillWave } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaUndoAlt className="inline-block" /> Refund Policy</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        We understand that sometimes things don’t go as planned. If you’re not satisfied with your order or have encountered issues, our Refund Policy is designed to make things right. We offer hassle-free refunds or replacements to ensure your experience with Fill Your Tummy meets your expectations.
      </p>
      <div className=" flex flex-row align-middle items-center justify-center gap-5">
        <FaMoneyBillWave className="text-5xl text-primary" />
        <p className="text-lg mt-4">Learn more about our refund procedures.</p>
      </div>
    </div>
  );
};
export default RefundPolicy;
