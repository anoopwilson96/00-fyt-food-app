import { FaBriefcase, FaBusinessTime } from 'react-icons/fa';

const CorporateOrders = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaBriefcase className="inline-block" /> Corporate Orders</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Impress your team and clients with delectable meals from Fill Your Tummy. Whether it's a team lunch, a client meeting, or a corporate event, we provide customized food delivery solutions tailored to meet your business needs. Enjoy large-scale orders delivered with precision, care, and punctuality.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaBusinessTime className="text-5xl text-primary" />
        <p className="text-lg mt-4">Let us handle your corporate catering with style and efficiency.</p>
      </div>
    </div>
  );
};
export default CorporateOrders;
