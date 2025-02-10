import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import API from "../lib/API";

const ResultCard = ({item, isLogin, toast}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteResultCard = async () => {
        try {
            const res = await API.delete(`/deleteresult/${item._id}`);
            toast.success(res.data.message);
        } catch (err) {
            toast.errer(err.response.data.errer);
        }
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
                isLogin && <MdOutlineDelete className="cursor-pointer absolute top-3 right-10 text-3xl bg-red-400 rounded-lg text-gray-200 hover:bg-red-500" onClick={handleDeleteResultCard} />
            }

            <div className={`${isOpen ? "inline" : "hidden"} m`}>
                {item.fast &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">প্রথম সাময়িক পরীক্ষার ফলাফল 

                    <a href={item.fast} target="_blank" className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a>

                </p>}


                {item.second &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">দ্বিতীয় সাময়িক পরীক্ষার ফলাফল 
                    
                    <a target="_blank" className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a></p>}
                {item.third &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">বার্ষিক পরীক্ষার ফলাফল 
                    
                    <a target="_blank" className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a></p>}
                {item.other &&<p className="p-2 mb-2 bg-gray-400 rounded-md relative">অন্যান্য পরীক্ষার ফলাফল 

                    <a target="_blank" className="bg-teal-700 p-1 text-white rounded-md absolute right-1 top-1">Download PDF</a></p>}
            </div>
    </div>
  )
}

export default ResultCard
