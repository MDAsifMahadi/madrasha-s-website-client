import {useState} from "react";
import API from "../lib/API";
import { toast } from "react-toastify";
const PopupBox = ({ isOpen , setIsOpen}) => {
  if (!isOpen) return null;

  const [data, setData] = useState({ title: "", desc: "" });

  const handleChange = (e, field) => {
    setData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!data.title.length > 0 || !data.desc.length > 0) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      await API.post("/createcard", data);
      toast.success("Card created"); 
      setIsOpen(false);
    } catch (error) {
      console.log(error)
      setIsOpen(false);
      toast.error("There was an error");
    }
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/25 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Title & Description</h2>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          value={data.desc}
          onChange={(e) => handleChange(e, "desc")}
          placeholder="Description"
          className="w-full p-2 border rounded mb-4"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBox;
