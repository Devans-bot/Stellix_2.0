import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import useOutsideClick from './popupremove'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Loadinganimation } from './loading'
import { Bookmark, Save } from 'lucide-react'

const Addtoboard = ({onClose}) => {

    const [loading,setLoading]=useState(true)
    const {id:pin}=useParams()

   const popupref= useRef()
   useOutsideClick(popupref,onClose)
    const [boards,setboards]=useState([])
   useEffect(()=>{
    const fetchboards=async()=>{
         try {
        const{data}=await axios.get("/api/boards/userboards")
        setboards(data)
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
    }
   fetchboards()
   },[])

   const submithandler=async(boardId)=>{
    try {
        const {data}=await axios.post(`/api/boards/newpin/${pin}`,{boardId})
        toast.success(data.message)
        onClose()
    } catch (error) {
        console.log(error)
    }
   }

   console.log(boards)
  return (
    <div className='fixed   top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    z-50 bg-black/80 flex flex-col items-center gap-3 backdrop-blur-md mt-10 rounded-4xl p-5 w-10/12 md:w-4/12 h-5/12 md:h-7/12' ref={popupref}>

    <h2 className='text-center rounded-full font-semibold w-full p-2 mb-4 text-white '>Add to a board !</h2>
   {loading ? (
      <Loadinganimation/> 
    ) : boards.length > 0 ? (
      boards.map((board) => 
        <div  key={board._id} className='bg-blue-500/80  flex items-center justify-around rounded-xl py-1 px-6 w-10/12'>    
          <button onClick={()=>(submithandler(board._id))} className='text-l w-full  flex items-center justify-start' >{board.name}</button>
          <Bookmark/>
        </div>
    ) ): (
      <h2 className='text-xs'>No boards found</h2>
    )}
    </div>
  )
}

export default Addtoboard
