import React, { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import { Pindata } from '../context/pincontext'
import { Loading } from '../components/loading'
import Pincard from '../components/pincard'
import axios from "axios";

import { useLocation, useNavigate } from 'react-router-dom'
import Topics from '../components/topics'
import { setCachedPin, getCachedPin, hasCachedPin } from "../components/pinPreviewCache.js";

import Searchbar from '../components/searchbar'
import api from '../lib/axios.js'

const Home = () => {
  const { pins, loading,filter,setfilter } = Pindata()
 const location=useLocation()
  const observerRef = useRef(null);
const pinElementsRef = useRef(new Map());
 const navigate=useNavigate()

 const prefetchPin = async (id) => {
  try {
    const res = await api.get(`/api/pins/${id}`);
    if (res?.data) setCachedPin(id, res.data);
  } catch {
    // fallback minimal cache to avoid refetch delay
    const pin = pins.find((p) => p._id === id);
    if (pin) setCachedPin(id, pin);
  }
};

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.dataset.id;
      if (id && !hasCachedPin(id)) {
        setTimeout(() => prefetchPin(id), 200 * Math.random());
      }    }
  });
};

useEffect(() => {
  if (loading) return;
  observerRef.current = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: "200px", // start prefetching a bit before visible
    threshold: 0.1,
  });
  pinElementsRef.current.forEach((el) => observerRef.current.observe(el));
  return () => observerRef.current?.disconnect();
}, [loading]);

  const [open,setopen]=useState(false)
  const desktopview = {
    default: 5,
    1400: 5,
    1200: 4,
    992: 3,
    700: 2,
    480: 1,
  };
  const mobileview = {
    default: 6,
    1400: 5,
    1200: 4,
    992: 3,
    700: 2,
    480: 2,
  };

  if (loading) return <Loading />

 
  
  
  return (


 

<div className='-mb-2  overflow-hidden scrollbar-none min-h-screen'> 
    
    <div className=" bg-[#00000] overflow-hidden mt-28 w-8xl pl-40 hidden md:block">
    <div className="  fixed top-0 left-0 right-0 z-1 bg-black/90 backdrop-blur-md px-6 pb-20 pt-5  h-1/10">
    <input type="text" 
        className=' text-sm  text-white bg-[#242424] h-13 block w-7/12 relative top-1/9  left-3/12 px-3 py-1 rounded-xl  shadow-sm focus:outline-none sm:text-sm;
'      
   onClick={()=>setopen(true)}
placeholder='Search..'
        />
      </div>
      <Topics/>
      <Masonry
        breakpointCols={desktopview}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pins.map((pin,i) => (
            <Pincard
            key={pin._id}
            pin={pin}
            registerNode={(el) => {
              if (!el) return;
              el.dataset.id = pin._id;
              pinElementsRef.current.set(pin._id, el);
              observerRef.current?.observe(el);
            }}
            unregisterNode={() => {
              const el = pinElementsRef.current.get(pin._id);
              if (el) observerRef.current?.unobserve(el);
              pinElementsRef.current.delete(pin._id);
            }}
            onOpen={(preview) => {
              const safePreview = preview || getCachedPin(pin._id);
              setCachedPin(pin._id, safePreview);

              navigate(`/pin/${pin._id}`, {
                state: {
                  background: location, // ✅ matches your App.jsx route transition logic
                  pinPreview: safePreview
                    ? JSON.parse(JSON.stringify(safePreview))
                    : null,
                },
              });
              
            }}
            
          />
))}
      </Masonry>

      
    </div>
    {open && <Searchbar isopen={open} setisopen={setopen}/>}


    
    <div  id="home-scroll-root" className="bg-[#0F0E15] min-h-screen   mt-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 block md:hidden">
      
      <Topics/>

      {pins.length===0 ? (
        <p className="text-center  mt-10">You follow none 😖</p>
      ):(

   <Masonry
        breakpointCols={mobileview}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pins.map((pin,i) => (
          <Pincard
          key={pin._id}
          pin={pin}
          registerNode={(el) => {
            if (!el) return;
            el.dataset.id = pin._id;
            pinElementsRef.current.set(pin._id, el);
            observerRef.current?.observe(el);
          }}
          unregisterNode={() => {
            const el = pinElementsRef.current.get(pin._id);
            if (el) observerRef.current?.unobserve(el);
            pinElementsRef.current.delete(pin._id);
          }}
          onOpen={(preview) => {
            const safePreview = preview || getCachedPin(pin._id);
            setCachedPin(pin._id, safePreview);
            navigate(`/pin/${pin._id}`, {
              state: {
                background: location, // ✅ matches your App.jsx route transition logic
                pinPreview: safePreview
                  ? JSON.parse(JSON.stringify(safePreview))
                  : null,
              },
            });
            
          }}     
        />
))}
      </Masonry>
      )}
   
    </div>

    </div>

  
   
  )
}

export default Home
