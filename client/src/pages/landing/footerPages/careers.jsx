import { FaBriefcase, FaUserTie } from 'react-icons/fa';

const Careers = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaBriefcase className="inline-block" /> Careers</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Join the Fill Your Tummy team and be a part of a growing company that's revolutionizing food delivery! We're always on the lookout for passionate, creative, and talented individuals who are excited about the food industry. From tech roles to customer support, we have opportunities waiting for you. Grow with us and make a real impact on how people enjoy their meals.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaUserTie className="text-5xl text-primary" />
        <p className="text-lg mt-4">Browse open positions and apply today!</p>
      </div>
    </div>
  );
};
export default Careers;
