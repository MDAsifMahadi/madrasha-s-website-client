import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./app.css";
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import { useEffect, useState } from "react";
import Result from "./pages/Result";
import Info from "./pages/Info";
import Kitab from "./pages/Kitab";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import KitabInfo from "./pages/KitabInfo";

const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const phone = sessionStorage.getItem('phone');
    const token = sessionStorage.getItem('token');
    if (phone) {
      setPhone(true);
    }
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
      <Navbar isLogin={isLogin} />
        <Routes>
      setIsLogin(true);
          <Route path="/" element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path="/faculty" element={<Faculty phone={phone} setPhone={setPhone} isLogin={isLogin} />} />
          <Route path="/result/:id"  element={<Result phone={phone} setPhone={setPhone} isLogin={isLogin} />}/>
          <Route path="/faculty/kitab"  element={<Kitab phone={phone} setPhone={setPhone} isLogin={isLogin} />}/>

          {/* { === ABOUT MADRASHA === } */}

          <Route path="/about"  element={<About phone={phone} setPhone={setPhone} isLogin={isLogin} />}/>
          <Route path="/about/kitab"  element={<KitabInfo phone={phone} setPhone={setPhone} isLogin={isLogin} />}/>
          <Route path="/about/:id"  element={<Info phone={phone} setPhone={setPhone} isLogin={isLogin} />}/>
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App;
