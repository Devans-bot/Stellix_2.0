import React, { use, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pindata } from '../context/pincontext';
import { Loading } from '../components/loading';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Like from '../components/like';
import { TiArrowLeftOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { GoShare } from "react-icons/go";
import Relatedpins from '../components/relatedpins';
import { IoCloudDownloadOutline } from "react-icons/io5";
import PinShare from '../components/PinShare';
import { Backpack } from 'lucide-react';
import BackButton from '../components/backbutton';
import { AiTwotoneFileAdd } from "react-icons/ai";
import Addtoboard from '../components/addtoboard';
import { IoIosArrowDown } from "react-icons/io";
import { TbZoomScan } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useOutsideClick from '../components/popupremove';
import { fadeIn, slideInFromRight } from '../components/gsap';
import withSlideTransition from '../components/transition';
import ZoomFromCardTransition from '../components/transition';
import { motion } from 'framer-motion';
import { pageVariants } from '../components/animations';
import { getCachedPin } from '../components/pinPreviewCache.js';

const Pinpage = ({ user }) => {
  
  const location = useLocation();

// 🔑 Persist the original background forever
const backgroundLocation =
  location.state?.background || location;

 
  const popupRef=useRef()
  const [deskopen,setdeskopen]=useState(false)

  const {
    loading,
    fetchpin,
    pin,
    setpin,
    updatepin,
    addcmmnt,
    deletecomment,
    deletePin
  } = Pindata();

const params = useParams();
const { state } = useLocation();
const preview = state?.pinPreview;
const displayPin =
  state?.pinPreview ||
  getCachedPin(params.id) ||
  pin;

  const navigate = useNavigate();
  const mobileRef=useRef()
  const nav=useNavigate()
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);
  
useEffect(() => {
  const cached = getCachedPin(params.id);
  const preview = state?.pinPreview;

  // 1️⃣ Instant render
  if (cached) {
    setpin(cached);
  } else if (preview) {
    setpin(preview);
  }

  // 2️⃣ Always refresh silently (no delay)
  fetchpin(params.id, { silent: true });
}, [params.id]);

  
  
  
  useEffect(() => {
    const homeRoot = document.getElementById("home-scroll-root");
    if (window.innerWidth >= 768 && homeRoot) {
      homeRoot.style.overflow = "hidden"; // lock Home scroll
    }
    return () => {
      if (homeRoot) {
        homeRoot.style.overflow = "auto"; // restore on modal close
      }
    };
  }, []);
  
  



  const handleBack = () => {
      nav(-1);
  };
  

  const [addtoboard,setaddtoboard]=useState(false)
  const [edit, setedit] = useState(false);
  const [title, settitle] = useState('');
  const [pinvalue, setpinvalue] = useState('');
  const [enlarged,setenlarged]=useState(false)
  const [descrip,setdescrip]=useState(false)
  const [editpin,seteditpin]=useState(false)
  const[open,setopen]=useState(false)

  const menuRef=useRef()
  useOutsideClick(menuRef,()=>seteditpin(false))



  const edithandler = () => {
    settitle(pin.title);
    setpinvalue(pin.pin);
    setedit(!edit);
  };

  const updtehandler = () => {
    updatepin(pin._id, title, pinvalue, setedit);
    settitle("")
    setpinvalue("")
  };

  const deletepin = () => {
      deletePin(pin._id, navigate);
  };


  const handleOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      nav(-1); // go back to background route
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  
  const handleDownload = async () => {
    try {
      const res = await fetch(pin?.image?.url, { mode: "cors" });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: pin?.title || "image",
      });
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed", e);
    }
  };

  
  
if (!displayPin) return <Loading />;
  const currenturl=window.location.href

  return (


<>
 
{ isDesktop ? 




  <div
    ref={popupRef}
    className="
      relative
       md:w-7/12
      bg-black/90
      rounded-none md:rounded-3xl
      shadow-2xl
      overflow-y-auto
      scrollbar-none
     
      h-6/6
      border border-black
      z-50
    "
  >
                  {addtoboard && <Addtoboard onClose={() => setaddtoboard(false)} />}

      {edit ? (

        <>
     <input
      value={title}
      onChange={(e) => settitle(e.target.value)}
      className='border font-semibold focus:outline-none text-xl text-center p-3 rounded-2xl w-1/3 absolute top-0 left-1/3 z-50'
    />
     <button
     type='submit'
        onClick={updtehandler}
        className='absolute text-sm right-12 p-3 rounded-2xl bg-blue-600 top-6 text-white px-2 py-1 '
      >
        Save
      </button>
        </>
   
  ) : (
    <>
    <div className='sticky bg-black/80 frosted-glass text-center top-0 pt-2 z-50 flex w-12/12 items-center '>
    <button
      onClick={handleBack}
      className="  bg-[#2C2C32] rounded-full p-2 shadow-lg hover:bg-gray-700 transition"
      >
      <TiArrowLeftOutline className="text-white" size={20} />
    </button>    
      <h1 className="  w-full  p-2  mr-14 text-xl font-semibold">
        {pin.title}
      </h1>
    </div>
      
    </>
  )}
<div className="w-6/6  rounded-2xl flex mt-16 items-center justify-center ">
  <img
    src={displayPin?.image?.url || "/placeholder.png"}
    alt={displayPin?.title}
    className="rounded-4xl max-w-[49vw]
    max-h-[66vh]
    w-auto
    h-auto  object-contain"
    onClick={() => setenlarged(true)}
  />
</div>

{/* RIGHT DETAILS */}
<div className="z-40 h-screen w-full scrollbar-none p-6 -mt-5 flex gap-6 relative px-18">
  
  {/* Floating Header */}


  {/* Spacer so content doesn't go under header */}
  <div className="flex  mt-5 flex-col w-full">
    {/* Like + Share + Download */}
    <div className="flex gap-7 w-full  items-center justify-between">

      <Like pin={pin} userId={user._id} />

      <div className="flex items-center gap-6">
        <PinShare pinUrl={currenturl}/>

        <IoCloudDownloadOutline className='text-2xl' onClick={handleDownload}/>
        <div onClick={() => setaddtoboard(true)} className='w-22 bg-blue-500 text-xs p-2 rounded-3xl flex items-center justify-center text-white cursor-pointer'>
      Save
    </div>

      </div>
    </div>
    

    {/* Edit/Dots Menu */}
   
   

    {/* Save to board */}
   
    {/* Description */}
  
      <p className='mt-10 text-gray-500 mb-8'>#tags : {pin.tags}</p>
    



    {/* Owner info */}
    {pin.owner && (
      <div className='flex gap-4 items-center w-full bg-blue-200gap-4 mt-6 pb-3 mb-3'>
        <Link to={`/user/${pin.owner._id}`}>
          <div className='rounded-full w-16 h-16  bg-gray-300 flex items-center justify-center text-sm font-bold'>
            {pin.owner.image && pin.owner.image.url  ? (
              <img
                src={pin.owner.image.url }
                alt={user.name || 'profile'}
                className="w-full h-full border-2 border-blue-400 object-cover rounded-full"
                style={{ objectPosition: 'top center' }}
              />
            ) : (
              <span className="text-5xl text-gray-700">{user.name?.charAt(0)}</span>
            )}
          </div>
        </Link>
        <div>
          <h2 className='text-sm font-semibold'>{pin.owner.name}</h2>
          <p className='text-xs mt-2 text-gray-500'>{pin?.owner?.followers?.length} Followers</p>
        </div>
      </div>
    )}

    <div className='w-12/12 flex items-center justify-center'>
          <Relatedpins pinId={pin._id}
            backgroundLocation={backgroundLocation}
       />
    </div>

    {/* Related Pins */}
  </div>
  
</div>

{/* Enlarged Image Modal */}
{enlarged && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
    onClick={() => setenlarged(false)}
  >
    <img
      src={displayPin?.image?.url || "/placeholder.png"}
      alt={displayPin?.title}
      className="max-w-full max-h-full object-contain"
    />
  </div>
)}

{pin.owner && user && pin.owner._id === user._id && (
      <button
        onClick={() => seteditpin(prev => !prev)}
        className="absolute top-6 right-6 bg-[#2C2C32] rounded-full z-50 p-1 shadow-lg hover:bg-gray-700 transition"
      >
        <HiOutlineDotsHorizontal className='text-white' />
      </button>
    )}

{pin.owner && user && pin.owner._id === user._id && editpin && (
      <div ref={menuRef} className='flex flex-col  justify-evenly w-22 h-34 items-center gap-5 absolute top-1 right-6 bg-blue-500/70 backdrop-blur-md rounded-2xl z-50 text-white '>
        <button onClick={edithandler}><FaEdit size={24} onClick={() => seteditpin(false)} /></button>
        <button onClick={deletepin}><MdDelete  size={24}/></button>
      </div>
    )}


  </div>





:



<div className='bg-[#0F0E15] px-4 h-screen w-full justify-center overflow-x-hidden pt-2 pb-10 flex md:hidden overflow-y-auto'>
  
{

  
         (
          <div className='bg-gray-1000 pt-8 rounded-xl shadow-md w-full max-w-md md:max-w-screen-md  flex flex-col md:flex-row'>
<BackButton pageRef={mobileRef} />
{/* LEFT - Image */}

            <div className=' relative w-full pl-3 pr-3 md:w-1/2 bg-[]#F2FAFF'>
              <img
                src={displayPin?.image?.url || "/placeholder.png"}
                alt={displayPin?.title}
                className='w-full border-1  border-black h-auto mt-3 mb-3 rounded-2xl md:max-h-full object-contain'
               />
              <TbZoomScan             
            onClick={()=>setenlarged(true)}
             className='text-white text-2xl absolute bottom-5 right-5' />
            </div>
                
                
              <div className="flex gap-4 items-center justify-between px-4 mt-1 text-xs text-gray-400   rounded-lg w-full">
                <p className="
                w-4/6
                break-words
                whitespace-normal
                 ">
    #tags: {pin?.tags}
  </p>               <Like pin={pin} userId={user._id} />
                </div>
                
            {enlarged && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition duration-300"
    onClick={() => setenlarged(false)}
  >
    <img
      src={displayPin?.image?.url || "/placeholder.png"}
      alt={displayPin?.title}
      className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out active:scale-105"
      style={{ objectPosition: 'top center' }}
    />
  </div>
)}


{

pin?.owner && (  
                <div className='flex items-center  w-full justify-between px-4  mt-10 pb-3 mb-3'>
                  
                
                 <div className=' flex items-center gap-2'>
                         <Link to={`/user/${pin.owner._id}`}>
                    <div className='rounded-full w-12 h-12 gap-2 bg-black flex items-center active:scale-125 transition-transform duration-300'>
                    {pin.owner.image && pin.owner.image.url ? (
            <img
              src={pin.owner.image.url}
              alt={user.name || 'profile'}
              className="w-full h-full border-2 border-blue-500 object-cover rounded-full"
              style={{ objectPosition: 'top center' }}
            />
          ) : (
            <span className="text-md text-gray-700">{user.name?.charAt(0)}</span>
          )}        
                 
                </div >
                  </Link>

                  <div className='text-white '>
                    <h3 className='text-xs font-semibold'>{pin.owner.name}</h3>
                    <h3 className='text-xs '>{pin?.owner?.followers?.length} Followers</h3>
                  </div>
                 </div>
              

                  <div className='flex items-center justify-center '>
                  <PinShare pinUrl={currenturl}/>
                   </div>

                </div>
)}

            

                        {/* Title + Buttons */}
             <div className=' text-white  w-full flex flex-col items-center justify-center '>
                {
                  edit ? (
                    <input
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      className='w-8/12 text-center p-2 border-1 border-white rounded-2xl focus:outline-none absolute top-0'
                      placeholder='New title'
                    />
                  ) : (
                    <h1 className='absolute top-0 pt-4 pb-4  text-sm  bg-[#0F0E15]  w-full text-center rounded-b-lg z-1 font-semibold'>{pin?.title}</h1>
                  
                  )
                }
                   {edit && (
                <button
                  onClick={updtehandler}
                  className=' absolute text-xs z-50 right-2 top-1 bg-blue-500/90 p-3 text-md rounded-2xl text-white '
                >
                  Save
                </button>
              )}
               
              
              {pin.owner && user && pin.owner._id === user._id && 
                (<button
                        onClick={() => (seteditpin((prev)=>(!prev)))}
                        className="absolute top-1 right-5 mt-2 bg-[#2C2C32] rounded-full z-1 p-1 shadow-lg hover:bg-gray-700 transition"
                      >
                    <HiOutlineDotsHorizontal className='text-white' />
 
                      </button>)
                }
            
           
            {pin.owner && user && pin.owner._id === user._id && editpin &&(
                  
                  <div ref={menuRef} className='flex flex-col items-center gap-5 absolute top-2 right-3 bg-blue-500/70 backdrop-blur-md rounded-2xl z-10 text-white w-auto h-auto p-3  '>
                    <button onClick={edithandler}><FaEdit onClick={()=>(seteditpin(false))} className='size-5' /></button>
                    <button onClick={deletepin} className=' text-white px-2 py-1 rounded text-sm'><MdDelete className='size-6' /></button>
                  </div>
                )}
              </div>

            {/* RIGHT - Details */}
            
            <div className='flex gap-2 text-xs  mt-5 w-full items-center justify-around'>
            <div onClick={handleDownload} className='w-24 py-3 rounded-3xl text-white bg-[#2C2C32] flex items-center justify-center'>
               Download
              </div>
              <div  onClick={() => setaddtoboard(true) }className=' w-24 py-3 text-white rounded-3xl bg-blue-500 flex items-center justify-center'>
               Save
                {addtoboard && (<Addtoboard onClose={()=>(setaddtoboard(false))}/>)}
              </div>
    </div>
          

               <h2 className='text-white mt-7 '>More to explore</h2>
               <div className='flex items-center  justify-center w-full'>
                              <Relatedpins pinId={pin._id}
                                  backgroundLocation={backgroundLocation}
/>

               </div>

            </div>
        )
      }
    </div>
    


}





        
         



 







    
   

</>





  );
};

export default React.memo(Pinpage);
