import {  useEffect, useState } from 'react';
import {toast} from "react-toastify"
import API from "../lib/API";
import { IoCloseOutline } from "react-icons/io5";


const CreateResult = ({createPopupOpen, setCreatePopupOpen, classId, data, isUpdate, setIsUpdating}) => {

    const [date, setDate] = useState(isUpdate ? data.date : "");
    const [fast, setFast] = useState(isUpdate ? data.fast : "");
    const [second, setSecond] = useState(isUpdate ? data.second : "");
    const [third, setThird] = useState(isUpdate ? data.third : "");
    const [other , setOther ] = useState(isUpdate ? data.other : "");

    const [isLoading , setIsLoading ] = useState(false);

    const handleCreate = async () => {
        try {
            setIsLoading(true)
            const data = {classId, date, fast, second, third, other}
            if (date === "") {
                toast.warning("সাল অবশ্যই সংযুক্ত করতে হবে")
                return;
            }
            await API.post("/createresult", data);
            setCreatePopupOpen(!createPopupOpen)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }

    };

    const handleUpdate = async () => {
      const item = {_id : data._id, date, fast, second, third, other}
      if (date === "") {
        toast.warning("সাল অবশ্যই সংযুক্ত করতে হবে")
        return;
      }
      try {
        setIsUpdating(true)
        await API.put("/updateresult", item);
        toast.success("Result is updated!")
        setIsUpdating(false)
        setCreatePopupOpen(!createPopupOpen)
      } catch (error) {
        console.log(error);
        toast.error("There was an error!");
        setIsUpdating(false)
      }
  
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/25 backdrop-blur-sm z-30">
      <div className="fixed inset-0 bg-blend-overlay bg-opacity-50 flex items-center justify-center max-w-[30rem] mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
        {
          isLoading && <div className="w-10 h-10 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] absolute right-2 bottom-5" ></div>
        }
        <IoCloseOutline className='text-4xl absolute right-0 top-0' 
            onClick={() => setCreatePopupOpen(!createPopupOpen)}
        />
          <h2 className="text-xl font-bold mb-4">নতুন ফলাফল যুক্ত করুন</h2>
          <label htmlFor='date'>সাল</label>
          <input
            id='date'
            type="number"
            placeholder="সাল"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <h2>লিংক যুক্ত করুন</h2>
          <input
            type="text"
            placeholder="প্রথম সাময়িক পরীক্ষার ফলাফল"
            value={fast}
            onChange={(e) => setFast(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="দ্বিতীয় সাময়িক পরীক্ষার ফলাফল"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="বার্ষিক পরীক্ষার ফলাফল"
            value={third}
            onChange={(e) => setThird(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="অন্যান্য পরীক্ষার ফলাফল"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          
          {
            isUpdate ? 
            
            <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button> 
          :
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add new
          </button>
          }
        
        </div>
      </div>
    </div>
    
  )
}

export default CreateResult;