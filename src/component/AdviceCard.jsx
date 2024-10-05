import axios from "axios";
import { useState, useEffect } from "react";
import { icon, parten } from "../assets/images";

const AdviceCard = () => {
  const [advice, setAdvice] = useState(() => {
    // Check if advice exists in localStorage
    const savedAdvice = localStorage.getItem("advice");
    return savedAdvice ? JSON.parse(savedAdvice) : "";
  });

  // Fetch new advice if none is stored in localStorage
  useEffect(() => {
    if (!advice) {
      fetchAdvice();
    }
  }, []);

  const fetchAdvice = () => {
    axios.get("https://api.adviceslip.com/advice").then((response) => {
      const newAdvice = response.data.slip;
      setAdvice(newAdvice);
      localStorage.setItem("advice", JSON.stringify(newAdvice)); // Save to localStorage
    });
  };

  return (
    <div className="bg-[#1f2632] advice text-white p-3 md:p-0 flex items-center justify-center h-screen w-full">
      <div className="h-[330px] relative w-full md:w-[550px] bg-[#323a49] p-5 text-center md:p-10 rounded-xl">
        <div className="mb-5 space-y-10">
          {advice && (
            <>
              <h3 className="text-[#52ffa8] text-sm">A D V I C E #{advice.id}</h3>
              <p className="font-medium text-2xl text-[#cee3e9]">"{advice.advice}"</p>
            </>
          )}
          <div className="flex justify-center">
            <img src={parten} alt="" />
          </div>
        </div>
        <div className="md:bottom-[250px] md:left-[935px] bottom-36 left-44 fixed">
          <button
            className="bg-[#52ffa8] hover:bg-[#8df6c1] h-14 w-14 rounded-full flex items-center justify-center"
            onClick={fetchAdvice}
          >
            <img src={icon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdviceCard;
