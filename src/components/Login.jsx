import {  useState } from 'react';
import API from "../lib/API";
import { IoCloseOutline } from "react-icons/io5";


const Login = ({toast, openLogin, setOpenLogin,setIsLogin}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  

    const handleLogin = async () => {
        try {
            if (email.length > 0 && password.length > 0) {
                const res = await API.post("/login", {email, password});
                toast.success(res.data.message);
                sessionStorage.setItem('token', res.data.token);
                setIsLogin(true)
                setOpenLogin(!openLogin)
                return;
            }
            
            toast.warning("Write email and password !")
        } catch (error) {
            toast.error("There was an error!");
            console.log(error)

        }

    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/25 backdrop-blur-sm ">
      <div className="fixed inset-0 bg-blend-overlay bg-opacity-50 flex items-center justify-center max-w-[30rem] mx-auto">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg relative">
        <IoCloseOutline className='text-4xl absolute right-0 top-0' 
            onClick={() => setOpenLogin(!openLogin)}
        />
          <h2 className="text-xl font-bold mb-4">নতুন ফলাফল যুক্ত করুন</h2>
          
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />
       
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        
        </div>
      </div>
    </div>
    
  )
}

export default Login;