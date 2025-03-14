import { useState } from 'react';
import API from "../lib/API";
import { IoCloseOutline } from "react-icons/io5";


const CreateTuacStudInfo = ({createPopupOpen, setCreatePopupOpen, classId, data}) => {

    const [teachers, setTeachers] = useState(data?.teachers ? data.teachers : "");
    const [students, setStudents] = useState(data?.students ? data.students : "");
    const [other, setOther] = useState(data?.other ? data.other : "");
   

    const [isLoading , setIsLoading ] = useState(false);

    const handleCreate = async () => {
        try {
            setIsLoading(true)
            const data = {
                classId, 
                teachers, 
                students,
                other,
            }
            
            await API.post("/about", data);
            setCreatePopupOpen(!createPopupOpen)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
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
          <h2 className="text-xl font-bold mb-4">শিক্ষকবৃন্দের তথ্য</h2>
          <input
            type="text"
            placeholder="লিংক যুক্ত করুন"
            value={teachers}
            onChange={(e) => setTeachers(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <h2 className="text-xl font-bold mb-4">ছাত্রদের তথ্য</h2>
          <input
            type="text"
            placeholder="লিংক যুক্ত করুন"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <h2 className="text-xl font-bold mb-4">অন্যান্য</h2>
          <input
            type="text"
            placeholder="লিংক যুক্ত করুন"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default CreateTuacStudInfo;