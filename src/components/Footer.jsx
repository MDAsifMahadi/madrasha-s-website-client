import { useState, useEffect } from "react";
import Login from "./Login";
import API from "../lib/API";


const Footer = ({toast, setIsLogin, isLogin}) => {

  const [openLogin, setOpenLogin] = useState(false);

  const [aboutMadrasha, setAboutMadrasha] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true)
      const data = {aboutMadrasha, address, number, email, website};
      await API.post("/footer", data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/footer");
        setAboutMadrasha(data.data[0].aboutMadrasha);
        setAddress(data.data[0].address);
        setNumber(data.data[0].number);
        setEmail(data.data[0].email);
        setWebsite(data.data[0].website);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [loading]);

  return (
    <footer className="bg-gray-800 text-white py-12 relative">
      {
        loading && <div className="w-10 h-10 absolute right-2 top-1 animate-spin rounded-full border-dashed border-8 border-[#3b9df8] " ></div>
      }
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='bg-gray-900 p-4 rounded-lg'>
            <h2 className="text-2xl font-bold mb-4">মাদ্রাসা সম্পর্কে</h2>
            <p className="text-gray-300"
              contentEditable={isLogin} 
              suppressContentEditableWarning
              
              onBlur={e => setAboutMadrasha(e.target.innerText)}
            >
              {aboutMadrasha}
            </p>
          </div>
          
          <div className='bg-gray-900 p-4 rounded-lg'>
            <h2 className="text-2xl font-bold mb-4">যোগাযোগ</h2>
            <ul className="text-gray-300">
              <li className="mb-2">
                <strong>ঠিকানা: </strong><span 
                  contentEditable={isLogin} 
                  suppressContentEditableWarning
                  onBlur={e => setAddress(e.target.innerText)}
                >{address}</span>
              </li>
              <li className="mb-2">
                <strong>ফোন: </strong>
                <span 
                  contentEditable={isLogin} 
                  suppressContentEditableWarning
                  onBlur={e => setNumber(e.target.innerText)}
                >{number}</span>
              </li>
              <li className="mb-2">
                <strong>ইমেইল: </strong><span 
                  contentEditable={isLogin} 
                  suppressContentEditableWarning
                  onBlur={e => setEmail(e.target.innerText)}
                >{email}</span>
              </li>
              <li className="mb-2">
                <strong>ওয়েবসাইট: </strong><span
                  contentEditable={isLogin} 
                  suppressContentEditableWarning
                  onBlur={e => setWebsite(e.target.innerText)}
                >{website}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-right text-gray-400 hover:underline cursor-pointer" onClick={()=> setOpenLogin(!openLogin)}>Login</p>
        {openLogin && <Login openLogin={openLogin} setOpenLogin={setOpenLogin} toast={toast}  setIsLogin={setIsLogin}/>}
      </div>
      {
        isLogin && <button className="absolute bg-gray-700 p-1 rounded-lg left-2 cursor-pointer hover:bg-gray-600" onClick={handleClick}>Save Footer Content</button>
      }
    </footer>
  );
};

export default Footer;