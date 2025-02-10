
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";



function Slider({slides, isLogin, current, setCurrent }) {

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleDelete = () => {
    alert("hello")
  };

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      clearInterval(slider);
    };
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-full mx-auto rounded-2xl shadow-lg overflow-hidden">
      {/* স্লাইডার ইমেজ */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <img src={s} alt={`Slide ${index}`} className="w-full object-cover" />
          </div>
        ))}
      </div>

      {/* নেভিগেশন বোতাম */}
      <div className="absolute top-0 h-full w-full flex justify-between items-center px-4 text-white text-3xl">
        <button
          onClick={previousSlide}
          className="bg-black bg-opacity-50 opacity-50 p-2 rounded-full hover:opacity-100 transition"
        >
          <BsFillArrowLeftCircleFill />
        </button>
        <button
          onClick={nextSlide}
          className="bg-black bg-opacity-50 opacity-50 p-2 rounded-full hover:opacity-100 transition"
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* ডট ইন্ডিকেটর */}
      <div className="absolute bottom-4 flex justify-center gap-3 w-full">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full w-3 h-3 cursor-pointer transition ${
              i === current ? "bg-white scale-110" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}



export default Slider;
