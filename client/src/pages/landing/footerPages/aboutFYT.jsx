import { FaBuilding, FaUtensilSpoon } from 'react-icons/fa';

const AboutFYT = () => {
  return (
    <div className="m-32 max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaBuilding className="inline-block" /> About FYT</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Fill Your Tummy is a dynamic food delivery platform that brings the finest local restaurants directly to you. Our mission is to connect people with their favorite meals in a fast, convenient, and reliable manner. We believe that food is an experience to be savored, and we strive to make every meal a delightful one.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaUtensilSpoon className="text-5xl text-primary" />
        <p className="text-lg mt-4">Satisfy your cravings with FYT!</p>
      </div>
    </div>
  );
};
export default AboutFYT;
