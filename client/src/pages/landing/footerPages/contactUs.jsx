import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaPhoneAlt className="inline-block" /> Contact Us</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Got questions or feedback? We're here to help! At Fill Your Tummy, we value your input and want to ensure you have the best experience possible. Whether it's about your order, partnerships, or general inquiries, feel free to reach out to us through any of the following methods.
      </p>
      <div className="flex justify-around mt-8">
        <div className="text-center">
          <FaPhoneAlt className="text-4xl mb-2 text-primary" />
          <p className="text-lg">+123 456 7890</p>
        </div>
        <div className="text-center">
          <FaEnvelope className="text-4xl mb-2 text-primary" />
          <p className="text-lg">support@fyt.com</p>
        </div>
        <div className="text-center">
          <FaMapMarkerAlt className="text-4xl mb-2 text-primary" />
          <p className="text-lg">123 Main St, City</p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
