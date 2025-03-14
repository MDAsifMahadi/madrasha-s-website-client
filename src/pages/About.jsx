import GetNum from "../components/GetNum";
import {Link} from "react-router-dom"
const About = ({phone, setPhone, isLogin}) => {
 
  if (!phone) {
    return <GetNum phone={phone} setPhone={setPhone} isLogin={isLogin} />;
  }
  return (
    <div className="w-full h-full text-center pb-10">
      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 py-10">জামিয়ার বিভিন্ন জামাতের শিক্ষকবৃন্দ এবং ছাত্রদের তথ্য</h3>

      <div className="flex flex-wrap items-center justify-center gap-10">
        <Link to="/about/nurani" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">নূরানী বিভাগ</h3>
        </Link>
        <Link to="/about/najara" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">নাজেরা বিভাগ</h3>
        </Link>
        <Link to="/about/hifs" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">হিফ্জ বিভাগ</h3>
        </Link>
        <Link to="/about/kitab" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">কিতাব বিভাগ</h3>
        </Link>
        <Link to="/about/ifta" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">ইফতা বিভাগ</h3>
        </Link>
        <Link to="/about/uloomulhadis" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
         <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">উলূমুল হাদিস</h3>
        </Link>
      </div>

    </div>
  );
};

export default About;