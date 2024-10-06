import { FaUserShield, FaLock } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaUserShield className="inline-block" /> Privacy Policy</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Your privacy matters to us. At Fill Your Tummy, we prioritize protecting your personal information and handle it with care. We follow strict protocols to ensure your data is secure and only use it to enhance your experience with us. Our Privacy Policy outlines what data we collect, how we use it, and the measures we take to safeguard it.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaLock className="text-5xl text-primary" />
        <p className="text-lg mt-4">Read more about how we protect your privacy.</p>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
