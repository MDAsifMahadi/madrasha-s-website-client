import GetNum from "../components/GetNum";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../lib/API";

const KitabInfo = ({ phone, setPhone }) => {
  
  if (!phone) {
    return <GetNum phone={phone} setPhone={setPhone} />;
  }

  const [allClass, setAllClass] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        setAllClass([])
        const res = await API.get("/getclass");
        setAllClass(res.data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  return (
    <div className="w-full h-full text-center pb-10 relative">
  
      {loading && (
        <div className="w-10 h-10 absolute right-5 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] z-10"></div>
      )}

      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 py-10">কিতাব বিভাগের শিক্ষকবৃন্দ এবং ছাত্রদের তথ্য</h3>
    
  
      <div className="flex flex-wrap items-center justify-center gap-10">
        {allClass.map((aClass) => (
          <div key={aClass._id} className="relative">
            <Link
              to={`/about/${aClass._id}`}
              className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300"
            >
              <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10">{aClass.class}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitabInfo;

