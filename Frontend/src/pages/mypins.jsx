import React, { useState } from 'react'
import { Pindata } from '../context/pincontext';
import { userdata } from '../context/usercontext';
import Masonry from 'react-masonry-css';
import Pincard from '../components/pincard';
import BackButton from '../components/backbutton';
import { useEffect } from 'react';

const Mypins = () => {
       
  const [loading,setloading]=useState(false)
      const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        480: 2,
        320: 1,
      };

  const { user } = userdata()
  const { pins } = Pindata()

  const [userpins, setUserpins] = useState([]);


 useEffect(() => {
    // Simulate async data availability
    if (user && pins) {
      const filtered = pins.filter((pin) => pin.owner === user._id);
      setUserpins(filtered);
      setloading(false); // ✅ done loading
    }
  }, [user, pins]);


  if(loading){
    return(
      <loading/>
    )
  }
  return (
   <div>
         <div className=" relative md:left-2/12 md:bg-black md:top-5 min-h-screen bg-[#0F0E15] w-full max-w-6xl p-4 pt-10">
        {userpins.length > 0 ? (
            <>  
             <BackButton/>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {userpins.map((pin,i) => (
  <Pincard key={pin._id} pin={pin} index={i} />
))}
          </Masonry>
            </>
         
        ) : (
          <p className="text-center text-gray-500">No pins yet</p>
        )}
      </div>

    </div> 
  
  )
}

export default Mypins
