import GetNum from "../components/GetNum";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom"
const Faculty = ({phone, setPhone, isLogin}) => {
 
  if (!phone) {
    return <GetNum phone={phone} setPhone={setPhone} isLogin={isLogin} />;
  }
  return (
    <div className="w-full h-full text-center pb-10">
      <Navbar />
      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 py-10">বিভাগ নির্বাচন করুন</h3>

      <div className="flex flex-wrap items-center justify-center gap-10">
        <Link to="/result/shortresult" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">জামিয়ার সংক্ষিপ্ত রেজাল্ট</h3>
        </Link>
        <Link to="/result/nurani" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">নূরানী বিভাগ</h3>
        </Link>
        <Link to="/result/najara" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">নাজেরা বিভাগ</h3>
        </Link>
        <Link to="/result/hifs" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">হিফ্জ বিভাগ</h3>
        </Link>
        <Link to="/faculty/kitab" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">কিতাব বিভাগ</h3>
        </Link>
        <Link to="/result/ifta" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
          <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">ইফতা বিভাগ</h3>
        </Link>
        <Link to="/result/uloomulhadis" className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">
         <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">উলূমুল হাদিস</h3>
        </Link>
      </div>

    </div>
  );
};

export default Faculty;