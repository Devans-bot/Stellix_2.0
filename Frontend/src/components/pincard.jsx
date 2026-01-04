import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { setCachedPin, getCachedPin, hasCachedPin } from "../components/pinPreviewCache.js";
import axios from "axios";


const Pincard = ({ pin, index, onOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  useEffect(() => {
    const refs = [desktopRef.current, mobileRef.current].filter(Boolean);
    refs.forEach((ref) => {
      const img = ref.querySelector("img");
      if (!img.complete) {
        img.onload = () => animate(ref);
      } else {
        animate(ref);
      }
    });
  
    function animate(ref) {
      gsap.fromTo(
        ref,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.06,
        }
      );
    }
  }, [index]);
  

  const handleClick = async (e) => {
    e.preventDefault();

    const activeRef = window.innerWidth >= 768 ? desktopRef.current : mobileRef.current;

    gsap.to(activeRef, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });

  
    let preview = getCachedPin(pin._id);
    if (!preview) {
      preview = { _id: pin._id, title: pin.title, image: pin.image, pin: pin.pin, owner: pin.owner };
      setCachedPin(pin._id, preview);
      if (!hasCachedPin(pin._id)) {

      api.get(`/api/pins/${pin._id}`).then((res) => {
        if (res?.data) setCachedPin(pin._id, res.data);
      }).catch(() => {});
    }
    }
  
if (onOpen) {
  onOpen(preview);
  return;
}
 navigate(`/pin/${pin._id}`, {
  state: {
    background: location, // 🔥 MUST BE LOCATION OBJECT
    pinPreview: preview ? JSON.parse(JSON.stringify(preview)) : null
  }
});
;  };
  

  return (
    <>
    {/* Mobile version */}
    <div
      ref={mobileRef}
      className="block md:hidden break-inside-avoid my-4 mr-13 w-full"
    >
  <div
  role="button"
  onClick={handleClick}
  className="
    block rounded-2xl overflow-hidden cursor-pointer
    bg-[#1a1a1a] shadow-md

    transform-gpu
    transition-transform
    duration-150 ease-out

    active:scale-[0.96]
  "
>


       <img
  src={pin?.image?.url || '/placeholder.png'}
  loading='lazy'
  alt={pin?.title || 'Pin image'}
  className="w-full object-cover rounded-2xl opacity-0 transition-opacity duration-500"
  onLoad={(e) => (e.currentTarget.style.opacity = 1)} // ✅ smooth reveal only after load
/>

      </div>
    </div>
  
    {/* Desktop version */}
    <div
      ref={desktopRef}
      className="hidden md:block break-inside-avoid my-4 mr-13 w-full"
    >
<div
  role="button"
  onClick={handleClick}
  className="
    relative
    block rounded-2xl overflow-hidden cursor-pointer
    bg-[#1a1a1a]

    transform-gpu
    transition-transform
    duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]

    hover:scale-[1.08]
  "
>


<img
  src={pin?.image?.url || '/placeholder.png'}
  loading='lazy'
  alt={pin?.title || 'Pin image'}
  className="w-full object-cover rounded-2xl opacity-0 transition-opacity duration-500"
  onLoad={(e) => (e.currentTarget.style.opacity = 1)} // ✅ smooth reveal only after load
/>

      </div>
    </div>
  </>
  
  );
};

export default Pincard;
