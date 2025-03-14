import { FaRegTrashAlt } from "react-icons/fa";
import PropTypes from 'prop-types';
import API from "../lib/API";
const Content = ({title, desc, id, isLogin, toast}) => {

  const handleDelete = async () => {
    try {
      await API.delete(`/deletecard/${id}`);
      toast.success("Card deleted");
    } catch (error) {
      toast.error("There was an error");
      console.log(error);
    }
  };
  
  return (
    <div className="w-[90%] md:w-[80%] m-auto p-2 px-8 space-y-4 bg-white rounded-md shadow-md text-center dark:bg-gray-800 dark:text-gray-300 mb-10 relative"> 
      {
        isLogin && <FaRegTrashAlt size={20} className="text-red-500 absolute top-2 right-2 cursor-pointer" onClick={handleDelete} />
      } 
      <h2 className="font-bold text-lg border-b-2 border-b-cyan-900 pb-1">{title}</h2>
      <p className="text-justify">{desc}</p>
    </div>
  )
}
Content.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default Content

