import { FaFileContract, FaScroll } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaFileContract className="inline-block" /> Terms of Service</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        By using Fill Your Tummy, you agree to abide by our terms and conditions. We have carefully crafted our Terms of Service to protect both you and our business while ensuring a smooth and fair experience. Please take a moment to read through our service terms to better understand how we operate and what you can expect from us.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaScroll className="text-5xl text-primary" />
        <p className="text-lg mt-4">Review our full Terms of Service here.</p>
      </div>
    </div>
  );
};
export default TermsOfService;
