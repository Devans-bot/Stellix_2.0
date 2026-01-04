import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css' // if you use this package
import Pincard from './pincard'       // adjust the path accordingly
import { Pindata } from '../context/pincontext'
import { useParams } from 'react-router-dom'
import { useLocation, useNavigate } from "react-router-dom";
import { setCachedPin, getCachedPin } from "../components/pinPreviewCache";
import { Loading, Loadinganimation } from './loading'
import api from '../lib/axios'

const mobileview = {
  default: 1,
  640: 2,
  768: 3,
  1024: 4
}
const desktopview = {
  default: 3,
  640: 2,
  768: 3,
  1024: 4
}

const Relatedpins = ({ pinId,backgroundLocation }) => {

   const navigate = useNavigate();
const location = useLocation();

   const [rpins,setrpins]=useState([])
   const [nloading,setnloading]=useState(false)

  useEffect(() => {
    const fetchRelatedPins = async () => {
       
      try {
        setnloading(true)
        const { data } = await api.post("/api/pins/relatedpins", { pinId })
        setrpins(data.results)
        setnloading(false)
      } catch (error) {
        console.error(error)
      }
    }

    if (pinId) {
      fetchRelatedPins()
    }
  }, [pinId, setrpins])



  return (


    (nloading ? <Loadinganimation/> :


      <>

    
      <div className=" mt-5 w-6/6  hidden md:block">
     
     <Masonry
       breakpointCols={desktopview}
       className="my-masonry-grid"
       columnClassName="my-masonry-grid_column"
     >
       {rpins.map((pin) => (
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
    background: backgroundLocation, // 🔥 SAME HOME BACKGROUND
    pinPreview: safePreview,
  },
  replace: true,
});

}}
 
        />       ))}
     </Masonry>
   </div>
 
 


 
    {/*mobile view*/}
     <div className="bg-[#0F0E15] mt-5 max-w-7xl block md:hidden">
     
     <Masonry
       breakpointCols={mobileview}
       className="my-masonry-grid"
       columnClassName="my-masonry-grid_column"
     >
       {rpins.map((pin) => (
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
    background: backgroundLocation, // 🔥 SAME HOME BACKGROUND
    pinPreview: safePreview,
  },
  replace: true,
});

}}
 
        />
        
        ))}
     </Masonry>
   </div>
    </>


     )
   )
}

export default Relatedpins
