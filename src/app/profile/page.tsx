"use client"
import axios from 'axios';
import React from 'react';
import {toast} from "react-hot-toast";
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const handleLogout = async () =>{
    console.log("Handle Logout");
    try {
      const response = await axios.get("/api/logout");
      console.log("Response From Server",response.data);
      if(!response.data?.success){
        toast.error(response.data?.message);
      }
      toast(response.data?.message);
      router.push("/login");
    } catch (error:any) {
      toast.error(error.message);
      console.log("Logout error",error.message);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      Profile Page
      <button
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={()=>handleLogout()}
      >Logout
      </button>
    </div>
  )
}

export default ProfilePage
