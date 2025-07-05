"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react"
import AddNewCourseDialog from "./AddNewCourseDialog";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CourseCard from "./CourseCard";

const CourseList = () => {
    const [courseList, setCourseList]=useState([]);
    const {user}=useUser();

    useEffect(() => {
      user && GetCourseList();
    }, [user]);

    const GetCourseList=async ()=>{
       const result=await axios.get('/api/courses');
       console.log(result.data);
       setCourseList(result.data);
    }
    return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Course List</h2>

      {courseList?.length==0 ? 
      <div className="flex p-7 flex-col justify-center items-center border rounded-xl mt-4 bg-secondary">
      <Image src={'/online-education.png'} alt="banner" width={100} height={100}/>
      <h2 className="my-2 text-xl font-bold">Look like you haven't created any courses yet!</h2>
      <AddNewCourseDialog>
      <Button>Create your first course +</Button>
      </AddNewCourseDialog>
      </div>
      :
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {courseList?.map((course,index)=>(
          <CourseCard key={index} course={course} />
        ))}
       </div>
      }
    </div>
  )
}

export default CourseList
