import API from "../lib/API";
import {toast, ToastContainer} from "react-toastify"
import { useEffect, useState} from "react"
import { FaUpload } from "react-icons/fa6";
import { GiSave } from "react-icons/gi";
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Navbar = ({isLogin}) => {

  const [isUploading, setIsUploading] = useState(false)
  const [texts, setTexts] = useState({
    arabic : "",
    bangla : "",
    english : "",
    address : "",
    logo_url : ""
  });

  // =============== get data from server ===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/nav");
        setTexts(data.navInfo[0])
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [isUploading]);


  const handleChange = (e, field) => {
    setTexts((prev) => ({
      ...prev,
      [field]: e.target.innerText
    }));
  };

  // =============== upload all change in the text ===============
  const handleClick = async () => { 
    try {
      setIsUploading(true)
      const { data } = await API.post("/nav", texts);
      toast.success(data.message);
      setIsUploading(false)
    } catch (error) {
      console.log(error);
      setIsUploading(false)
    }
  }

  const handleUpload = async (e) => {
    try {
      setIsUploading(true)
      const file = e.target.files[0];
      const fromData = new FormData();
      fromData.append("logo", file);
      const res = await API.post("/upload", fromData);
      toast.success(res.data);
      setIsUploading(false)
    } catch (error) {
      console.log(error);
      setIsUploading(false)
    }
  };

  return (<>
    <HelmetProvider>
      <Helmet>
        <title>{texts.arabic}</title>
        <link rel="icon" href={texts.logo_url} />
      </Helmet>
    </HelmetProvider>
    <div className="group w-full p-1.5 bg-teal-700 md:relative space-y-2.5">
      {
          isUploading ? <div className="w-10 h-10 absolute right-0 animate-spin rounded-full border-dashed border-8 border-[#3b9df8]"></div> : null
        }
      {
        isLogin && <GiSave className="absolute cursor-pointer decoration-200 opacity-0 group-hover:opacity-100" color="white" size={30} onClick={handleClick} />
      }
      <div className=" mx-auto w-21 relative h-21 md:absolute md:left-5 md:top-4 lg:left-10">
        <img src={texts.logo_url} 
          alt="logo" 
          className="w-20 h-20 rounded-full"
        />
        {
          isLogin && (
            <>
              <input type="file" id="logo" className="hidden" onChange={handleUpload}/>
              <label htmlFor="logo" className="absolute top-6 left-6 text-center"><FaUpload size={30} />
              </label>
            </>
          )
        }
      </div>
      <h1 
        contentEditable={isLogin} 
        suppressContentEditableWarning 
        className="arabic text-center font-semibold text-2xl text-white"
        onBlur={(e) => handleChange(e, "arabic")}
      >{texts.arabic}</h1>
      <div className="w-full mx-auto md:flex items-center justify-center space-x-5">
        <h2 contentEditable={isLogin} suppressContentEditableWarning className="text-center font-semibold text-lg text-white" onBlur={(e) => handleChange(e, "bangla")}>{texts.bangla}</h2>
        <h2 contentEditable={isLogin} suppressContentEditableWarning className="text-center font-semibold text-lg text-white" onBlur={(e) => handleChange(e, "english")}>{texts.english}</h2>
      </div>
      <p contentEditable={isLogin} suppressContentEditableWarning className="text-center text-sm text-white" onBlur={(e) => handleChange(e, "address")}>{texts.address}</p>
      <ToastContainer />
    </div>
    </>
  )
}


export default Navbar
