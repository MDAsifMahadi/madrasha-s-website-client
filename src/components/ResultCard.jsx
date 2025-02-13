import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import API from "../lib/API";
import CreateResult from "./CreateResult";

const ResultCard = ({item, isLogin, toast, setIsUpdating}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleDeleteResultCard = async () => {
            
        try {
            if (confirm("Do you want to delete ?")) {
                setIsUpdating(true)
                await API.delete(`/deleteresult/${item._id}`);
                setIsUpdating(false);
                return;
            }
        } catch (err) {
            toast.errer(err.response.data.errer);
            setIsUpdating(false)
        }
    
        
    }

    const handleEditResultCard = () => {
        setIsUpdate(!isUpdate);
    }

  return (
    <div className="p-3 bg-gray-300 rounded-lg relative space-y-2">
        <p className="text-lg font-bold text-black">{item.date} সালের রেজাল্ট</p>
            {
                isOpen ? <RiArrowDropUpLine
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer absolute top-3 right-1 text-3xl bg-gray-600 rounded-lg text-white"
            /> :<RiArrowDropDownLine
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer absolute top-3 right-1 text-3xl bg-gray-600 rounded-lg text-white"
            />
            }

            {
                isLogin &&<>
                     <MdOutlineDelete className="cursor-pointer absolute top-3 right-10 text-3xl bg-red-400 rounded-lg text-gray-200 hover:bg-red-500" onClick={handleDeleteResultCard} />

                     <FiEdit className="p-1 cursor-pointer absolute top-3 right-20 text-3xl bg-red-400 rounded-lg text-gray-200 hover:bg-red-500" 
                    onClick={handleEditResultCard}
                     />
                </>
            }

            <div className={`${isOpen ? "inline" : "hidden"} m`}>
                {item.fast &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">প্রথম সাময়িক পরীক্ষার ফলাফল 

                    <a href={item.fast} target="_blank" className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a>

                </p>}


                {item.second &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">দ্বিতীয় সাময়িক পরীক্ষার ফলাফল 
                    
                    <a target="_blank" href={item.second} className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a>
                    
                    </p>}
                {item.third &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">বার্ষিক পরীক্ষার ফলাফল 
                    
                    <a target="_blank" href={item.third} className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a></p>}
                {item.other &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">অন্যান্য পরীক্ষার ফলাফল 

                    <a target="_blank" href={item.other} className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a></p>}
            </div>
            {
                isLogin && <>
                    {
                        isUpdate && <CreateResult data={item} isUpdate={isUpdate} createPopupOpen={isUpdate} setCreatePopupOpen={setIsUpdate} setIsUpdating={setIsUpdating} />
                    }
                
                </>            
            }
    </div>
  )
}

export default ResultCard
