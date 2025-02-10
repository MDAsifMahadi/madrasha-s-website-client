import { useEffect, useState } from 'react';
import API from "../lib/API";
import {toast, ToastContainer} from "react-toastify"
const GetNum = ({phone, setPhone, isLogin}) => {

     const [phoneNumber, setPhoneNumber] = useState('');
     const [num, setNum] = useState('');

     useEffect(() => {
      (async () => {
        const data = await API.get("/getphone");
        setNum(data.data.phoneNum[0].phoneNum);
      })()
     }, [])

     const handleUpdate = async () => {
      try {
        if (phoneNumber.length === 11) {
          const res = await API.put("/createorupdatephone", {phoneNum : phoneNumber});
          toast.success(res.data.message);
          return;
        }
        toast.warning("Your number is invalid!")
      } catch (error) {
        console.log(error.response.data)
        toast.error(error.response.data.error);
      }
     }; 

     const handleVerify = () => {
        if (phoneNumber === num) {
          sessionStorage.setItem('phone', true);
          setPhone(true);
        } else {
          alert('Please enter a valid phone number.');
        }
      };
      
  return (
    <div className="fixed inset-0 bg-blend-overlay bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Enter Your Phone Number</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleVerify}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
          {
            isLogin && <button
            onClick={handleUpdate}
            className="bg-cyan-600 text-white px-4 py-2 rounded ml-2"
            >
              Update
            </button>
          }
        </div>
        <ToastContainer />
      </div>
  )
}

export default GetNum
