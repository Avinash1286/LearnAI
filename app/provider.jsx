"use client"

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs"
import axios from "axios";
import { useEffect, useState } from "react";

export function Provider({children}){
  const {user}=useUser();
  const [selectedChapterIndex,setSelectedChapterIndex]=useState(0);
  const [userDetails,setUserDetails]=useState();
  useEffect(() => {
   user && CreateNewUser()
  }, [user]);
  const CreateNewUser=async()=>{
    const result=await axios.post('/api/user',{
      name:user?.fullName,
      email:user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data);
    setUserDetails(result.data);
  }
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <SelectedChapterIndexContext.Provider value={[selectedChapterIndex,setSelectedChapterIndex]}>
    <div>{children}</div>
    </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  )
}

