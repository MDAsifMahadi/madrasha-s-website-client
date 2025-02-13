import {  useState } from 'react';
import API from "../lib/API";
import { IoCloseOutline } from "react-icons/io5";

import { toast} from "react-toastify"
const CreateFaculty = ({openPopup, setOpenPopup,setUpdating}) => {

    const [name, setName] = useState("");

    const handleCreate = async () => {
        try {
            if (name !== "") {
              setUpdating(true);
                const res = await API.post("/addclass", {newClassName : name});
                toast.success(res.data.message);
                setOpenPopup(!openPopup);
                setUpdating(false)
                return;
            }
            toast.warning("Enter a class name");
        } catch (error) {
            console.log(error)
            setUpdating(false)
        }

    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/25 backdrop-blur-sm z-20">
      <div className="fixed inset-0 bg-blend-overlay bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <IoCloseOutline className='text-4xl absolute right-0 top-0' 
            onClick={() => setOpenPopup(!openPopup)}
        />
          <h2 className="text-xl font-bold mb-4">নতুন বিভাগ যুক্ত করুন</h2>
          <input
            type="text"
            placeholder="Add a new class"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add new
          </button>
        
        </div>
      
      </div>
    </div>
    
  )
}

export default CreateFaculty;