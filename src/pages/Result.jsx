import { useEffect, useState } from "react";
import GetNum from "../components/GetNum";
import Navbar from "../components/Navbar";
import { IoIosAdd } from "react-icons/io";
import CreateResult from "../components/CreateResult";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import API from "../lib/API";
import ResultCard from "../components/ResultCard";

const Result = ({ phone, setPhone, isLogin}) => {

  if (!phone) {
    return <GetNum phone={phone} setPhone={setPhone} />;
  }

  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const classId = useParams().id;

  const [dateList, setDateList] = useState([]);

  useEffect(()=> {
    (async () => {
      try {
        setIsLoading(true)
        const res = await API.get(`getresult/${classId}`);
        setDateList(res.data.results);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    })()
  }, [classId, createPopupOpen, isUpdating])

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="w-full md:w-[70%] mx-auto mt-5 bg-gray-200 overflow-y-auto min-h-20 md:max-h-150 rounded-lg p-5 space-y-2 relative">
        
        {
          isLoading ? <div className="w-10 h-10 absolute right-2 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] " ></div> : isUpdating ? <div className="w-10 h-10 absolute right-2 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] " ></div> : null
        }
        
        {
          isLogin && <>
              <IoIosAdd  className="text-4xl text-gray-800  hover:bg-gray-400 rounded-lg" onClick={() => setCreatePopupOpen(!createPopupOpen)}/>
                {
                  createPopupOpen && <CreateResult createPopupOpen={createPopupOpen} setCreatePopupOpen={setCreatePopupOpen} classId={classId} toast={toast} />
                }
          </>
        }
            {dateList.map((item) => (
              <ResultCard item={item} key={item._id} isLogin={isLogin} toast={toast} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
            ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Result;
