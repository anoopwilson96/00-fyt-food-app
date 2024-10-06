import { FaBalanceScale, FaGavel } from 'react-icons/fa';

const Legal = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaBalanceScale className="inline-block" /> Legal Information</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        At Fill Your Tummy, we are committed to maintaining transparency and adhering to legal standards. Our terms, policies, and agreements are designed to protect your privacy, ensure fairness, and clarify your rights and responsibilities when using our services.
      </p>
      <div className="text-center mt-8">
        <FaGavel className="text-5xl text-primary" />
        <p className="text-lg mt-4">For detailed legal documents, visit our Legal Resources page.</p>
      </div>
    </div>
  );
};
export default Legal;
