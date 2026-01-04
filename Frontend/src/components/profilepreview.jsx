// ProfilePreviewCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";

const ProfilePreviewCard = ({ title, redirect }) => {
  const [pins, setPins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const { data } = await api.get("/api/pins/getmypin"); // 👈 fetch user pins
        // randomly pick 3
        const randomPins = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPins(randomPins);
      } catch (err) {
        console.error("Error loading pins", err);
      }
    };

    fetchPins();
  }, []);

  const [Pressed,setPressed]=useState(false)

  return (

    <>
     <div
      className="text-white  bg-black/10
  backdrop-blur-md
  border border-white/10   w-xl hidden md:block mt-5 rounded-xl shadow-md p-2 cursor-pointer transform-gpu transition-transform hover:scale-[1.03] "
      onClick={() => navigate(redirect)}
    >
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <div className="grid grid-cols-4 w-full  rounded-2xl  gap-2">
        {pins.map((pin) => (
          <img
            key={pin._id}
            src={pin.image.url}
            alt={pin.title}
            className="w-full h-7/12  object-cover rounded-lg"
          />
        ))}
        {pins.length === 0 && (
          <p className="col-span-3 text-gray-500 text-sm">No pins yet</p>
        )}
      </div>
    </div>



    
    
    
    
    
    
    
    
    
    <div
className="text-white  bg-black/10
  backdrop-blur-md
  border border-white/10 w-full max-w-full block md:hidden mt-5 rounded-xl shadow-lg p-2 cursor-pointer"

      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}

      onClick={() => navigate(redirect)}
    >
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
<div className="grid grid-cols-3 gap-2 w-full min-h-[96px]">
        
       {pins.length === 0 ? (
  <>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-full h-20 rounded-lg bg-[#2C2C32] animate-pulse"
      />
    ))}
  </>
) : (
  pins.map((pin) => (
    <img
      key={pin._id}
      src={pin.image.url}
      alt={pin.title}
      className="w-full h-20 object-cover rounded-lg"
    />
  ))
)}

      </div>
    </div>
    </>


    
   
  );
};

export default ProfilePreviewCard;
