import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const Pincontext=createContext()


export const Pinprovider=({children})=>{


     const [pins,setpins]=useState([])
     const [loading,setloading]=useState(false)
     const [rpins,setrpins]=useState([])
     const [filter,setfilter]=useState("all")

     async function fetchpins(){
      try {
        const url = filter === "following" ? "/api/pins/following":"/api/pins/all"
        const {data}=await api.get(url)
        setpins(data)
        setloading(false)
        if(filter===pins){
          console.log(pins)
        }
      } catch (error) {
      
        setloading(false)
      }
     }

    const [pin,setpin]=useState([])
    async function fetchpin(id, { silent = false } = {}) {
      try {
        if (!silent) setpin(null);  // prevent white flash when silent
        const { data } = await api.get("/api/pins/single/" + id);
        setpin(data);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    }
    

  async function updatepin(id, title, pinvalue, setedit) {
  try {
    const { data } = await api.put(`/api/pins/${id}`, {
      title,
      pin: pinvalue,
    });

    toast.success(data.message);

    // ✅ Optimistically update pin instead of refetching
    setpin((prev) => ({
      ...prev,
      title,
      pin: pinvalue,
    }));

    setedit(false);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Update failed");
  }
}


   async function addcmmnt(id,comment,setcmmnt){
    try {
      const {data}= await api.post("/api/pins/comment/"+id,{comment})
      toast.success(data.message)
      fetchpin(id)
      setcmmnt('')
    } catch (error) {
      
    }
   }

  async function deletecomment(id, commentid) {
    try {
      const { data } = await api.delete(
        `/api/pins/deletecomment/${id}?commentId=${commentid}`
      );
      toast.success(data.message);
      fetchpin(id);
    } catch (error) {
      console.error("Delete comment error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  
  async function deletePin(id,navigate){
     try {
      const { data } = await api.delete(
        `/api/pins/${id}`
      );  
      toast.success(data.message)
      navigate('/')
      setloading(false)
      fetchpins()
     } catch (error) {
      console.log(error)
     }
  }
  const [UploadPercent,setUploadPercent]=useState('')

  
  async function addpin(formdata, setUploadFilePrev, setUploadFile, settitle, setpin, navigate) {
      setloading(true)
    try {
      setloading(true);
      const { data } = await api.post("/api/pins/createpin", formdata)
      toast.success(data.message);
      setUploadFile([]);
      setUploadFilePrev("");
      setpin("");
      settitle("");
      const newPin = data.pin;
    setpins((prev) => [newPin, ...prev]); 
     navigate("/")
  
    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    } finally {
      setloading(false);
    }
  }
  


const likePin = async (pinId) => {
  try {
    const { data } = await api.put(`/api/pins/like/${pinId}`);
    return data; // data = { msg, likescount, liked }
  } catch (error) {
    console.error("Error liking pin:", error);
  }
};




     useEffect(()=>{
        fetchpins()
     },[filter])
      
     


    return <Pincontext.Provider value={{UploadPercent,setUploadPercent,pins,filter,setfilter,loading,setloading,fetchpin,pin,setpin,updatepin,addcmmnt,deletecomment,deletePin,addpin,fetchpins,likePin,rpins,setrpins}}>{children}</Pincontext.Provider>
}

export const Pindata=()=>useContext(Pincontext)