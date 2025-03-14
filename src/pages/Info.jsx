import { useEffect, useState } from "react";
import GetNum from "../components/GetNum";
import CreateTuacStudInfo from "../components/CreateTuacStudInfo";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import API from "../lib/API";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Info = ({ phone, setPhone, isLogin}) => {

  if (!phone) {
    return <GetNum phone={phone} setPhone={setPhone} />;
  }

  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});
  const classId = useParams().id;

  useEffect(()=> {
    (async () => {
      try {
        setIsLoading(true)
        const res = await API.get(`/about/${classId}`);
        setData(res.data.info[0]);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    })()
  }, [classId, createPopupOpen])

  return (
    <>
      <div className="w-full">
        <div className="w-full md:w-[70%] mx-auto mt-5 bg-gray-200 dark:bg-gray-500 overflow-y-auto min-h-20 md:max-h-150 rounded-lg p-5 space-y-2 relative">
        
        {
          isLoading && <div className="w-10 h-10 absolute right-2 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] " ></div>
        }
        
        {
          isLogin && <>
              <HiOutlinePencilSquare  className="text-4xl text-gray-800  hover:bg-gray-400 rounded-lg" onClick={() => setCreatePopupOpen(!createPopupOpen)}/>
                {
                  createPopupOpen && <CreateTuacStudInfo createPopupOpen={createPopupOpen} setCreatePopupOpen={setCreatePopupOpen} classId={classId} toast={toast} data={data} />
                }
          </>
        }
            {
              data?.teachers && 
              <div className="p-3 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-between space-y-2">
                <h2 className="text-black dark:text-white font-bold text-xl">শিক্ষকবৃন্দের তথ্য </h2>
                <a href={data?.teachers} target="_blank" className="bg-teal-700 p-1 text-white rounded-md ">Download PDF</a>
              </div>
            }

            {
              data?.students &&
              <div className="p-3 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-between space-y-2">
                <h2 className="text-black dark:text-white font-bold text-xl">ছাত্রদের তথ্য</h2>
                <a href={data?.students} target="_blank" className="bg-teal-700 p-1 text-white rounded-md ">Download PDF</a>
              </div>
            }

            {
              data?.other &&
              <div className="p-3 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-between space-y-2">
                <h2 className="text-black dark:text-white font-bold text-xl">অন্যান্য</h2>
                <a href={data?.other} target="_blank" className="bg-teal-700 p-1 text-white rounded-md ">Download PDF</a>
              </div>
            }
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Info;
