"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import { Skeleton } from "@/components/ui/skeleton"

const page = () => {
    const [courseList, setCourseList]=useState([]);
    const {user}=useUser();

    useEffect(() => {
      user && GetCourseList();
    }, [user]);

    const GetCourseList=async ()=>{
       const result=await axios.get('/api/courses?courseId=0');
       console.log(result.data);
       setCourseList(result.data);
    }

  return (
    <div>
      <h2 className='font-bold text-3xl mb-6'>Explore More Courses</h2>
      <div className='flex gap-5 max-w-md'>
          <Input placeholder="Search"/>
          <Button><Search/>Search</Button>
      </div>

      {courseList.length> 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {courseList?.map((course,index)=>(
          <CourseCard key={index} course={course} />
        ))
        }
       </div>
       :
       <div className='flex gap-5'>
        {[0,1,2].map((item,index) => (
           
           <div key={index} className="flex mt-5 flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
       ))}
       </div>
       }
    </div>
  )
}

export default page
