import Slider from "../components/Slider";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import PopupBox from "../components/PopupBox";
import { ToastContainer, toast } from "react-toastify";
import API from "../lib/API";
import { FaUpload } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

const Home = ({isLogin, setIsLogin}) => {
    const [current, setCurrent] = useState(0);
    const [slides, setSliders] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
      useEffect(() => {
        const getSlider = async () => {
          const res = await API.get("/getsliderurl");
          setSliders(res.data.urls);
        }
        getSlider();

        const getCards = async () => {
          try {
            const res = await API.get("/createcard");
            if (res.data.cards) {
              setCards(res.data.cards);
            }
          } catch  {
            toast.error("There was an error");
          }
        };
        getCards();
      }, [isOpen, isUploading]);

    const handleSliderImgUpload = async (e) => {
      try {
        setIsUploading(true)
        const file = e.target.files[0];
        const fromData = new FormData();
        fromData.append("slider", file);
        const res = await API.post("/uploadslider", fromData);
        toast.success(res.data.message)
        setIsUploading(false)
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.message)
        setIsUploading(false)
      }
    }
    
    const handleDeleteSliderImg = async () => {
      try {
        setIsUploading(true)
        const currentImgUrl = slides[current];
        const url = currentImgUrl.split("/");
        const public_id = url[url.length - 1].split(".")[0];

        const res = await API.put(`/deletesliderurl/${public_id}`, {url : currentImgUrl});
        toast.success(res.data.message);
        setIsUploading(false)
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.message);
        setIsUploading(false)
      }
    }

  return (
    <div>
      <Navbar isLogin={isLogin} />

      <div className="w-[90%] md:w-[80%] m-auto pt-2 space-y-4 mb-10">
        <h3 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300">জামিয়ার কিছু ছবি</h3>

        {
          isLogin && <div className="relative">
            <input type="file" id="slider" className="hidden" onChange={handleSliderImgUpload} />
            <label htmlFor="slider"><FaUpload className="text-cyan-500 text-xl"/></label>

            <button className="w-8 h-8 flex items-center justify-center absolute text-2xl right-2 top-0 bg-red-500 rounded-full text-white" onClick={handleDeleteSliderImg}>
              <MdOutlineDelete className=""/>
            </button>
            {
              isUploading && <div className="w-10 h-10 absolute right-0 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] z-10 top-[-3rem]"></div>
            }
          </div>
        }

        <Slider current={current} setCurrent={setCurrent} slides={slides} setSliders={setSliders} isLogin={isLogin}/>
      </div>

      <div className="group relative min-h-1">
      {
        isLogin && <FaPlus size={30} className="text-cyan-700 absolute top-[-30px] md:left-10 bg-gray-300 opacity-0 group-hover:opacity-100" onClick={()=> setIsOpen(true)} />
      }
        {
          cards.map((card) => (
            <Content key={card._id} id={card._id} title={card.title} desc={card.desc} isLogin={isLogin} toast={toast} />
          ))
        }
        <PopupBox isOpen={isOpen} setIsOpen={setIsOpen}  />
      </div>  

      <Link className="w-full flex justify-center mb-10">
        <Link to='/faculty' className="bg-white border-teal-700 px-2 py-2 rounded-lg text-base font-bold hover:bg-teal-800 text-teal-800 hover:text-white ring-2 ring-teal-800  duration-150 shadow-md focus:ring focus:ring-cyan-600 focus:ring-offset-5">জামিয়ার ছাত্রদের রেজাল্ট</Link>
      </Link>

      <Footer toast={toast} setIsLogin={setIsLogin} isLogin={isLogin} />
      <ToastContainer />
    </div>
  )
}

export default Home;
