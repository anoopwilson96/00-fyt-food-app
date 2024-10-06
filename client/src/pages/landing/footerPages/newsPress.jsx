import { FaNewspaper, FaMicrophone } from 'react-icons/fa';

const NewsPress = () => {
  return (
    <div className="m-32  max-w-5xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4"><FaNewspaper className="inline-block" /> News & Press</h2>
      <p className="text-lg leading-relaxed mb-4 text-center">
        Fill Your Tummy is making waves in the food delivery industry, and we’re proud to be recognized by top media outlets. Stay updated with the latest news, announcements, and media coverage about FYT as we continue to grow and redefine how people enjoy their food.
      </p>
      <div className="flex flex-row align-middle items-center justify-center gap-5">
        <FaMicrophone className="text-5xl text-primary" />
        <p className="text-lg mt-4">Catch up on our latest press releases and interviews!</p>
      </div>
    </div>
  );
};
export default NewsPress;
