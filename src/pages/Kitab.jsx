import GetNum from "../components/GetNum";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import CreateFaculty from "../components/CreateFaculty";
import API from "../lib/API";
import { MdDeleteOutline } from "react-icons/md";

const Kitab = ({phone, setPhone, isLogin}) => {
  
  if (!phone) {
    return <GetNum phone={phone} setPhone={setPhone} />;
  }
  
  const [allClass, setAllClass] = useState([])
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const handlePopupOpen = () => {
    setOpenPopup(!openPopup);
  }

  useEffect(() => {
    (async () => {
      const res = await API.get("/getclass");
      setAllClass(res.data.data);
    })()
  }, [isLoading])


  const handleDeleteClass = async (e, id) => {
    e.stopPropagation();
    const confarm = confirm("Do you want to delete ?")
    if (confarm) {
      try {
        setIsLoading(true)
        await API.delete(`deleteclass/${id}`);
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
      return;
    }


  };

  return (
    <div className="w-full h-full text-center pb-10">
      <Navbar />
      {
        isLoading && <div className="w-10 h-10 absolute right-0 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] z-10 top-[-3rem]"></div>
      }
      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 py-10">শ্রেণী নির্বাচন করুন</h3>
    
    {
        isLogin && <>
          <FaPlus className="text-2xl mx-5 hover:bg-gray-700 hover:text-white duration-150 rounded-md" onClick={handlePopupOpen}/>
          {
            openPopup && <CreateFaculty openPopup={openPopup} setOpenPopup={setOpenPopup} setIsLoading={setIsLoading} />
          }
        </>
    }

      <div className="flex flex-wrap items-center justify-center gap-10">
        
        {
          allClass.map((aClass) => {
            return <div  key={aClass._id} className="relative">
             {
              isLogin &&  <MdDeleteOutline className="absolute top-2 right-2 text-2xl hover:bg-gray-400 rounded-lg"onClick={e => handleDeleteClass(e, aClass._id)}/>
             }
              
              <Link to={`/result/${aClass._id}`} className="w-40 h-40 bg-gray-300 dark:bg-gray-500 rounded-md flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/50 hover:shadow-xl duration-300">

            <h3 className="font-bold text-lg text-gray-700 dark:text-white py-10 ">{aClass.class}</h3>

          </Link></div>
          })
        }

      </div>
    </div>
  );
};

export default Kitab;