"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Loader2Icon, PlayCircle, Sparkle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

const CourseCard = ({course}) => {
    const courseJson=course?.courseJson?.course;
    const [loading, setLoading] =useState(false);
    const onEnrollCourse=async ()=>{
        try {
            setLoading(true);
        const result=await axios.post('/api/enroll-course',{
            courseId:course?.cid
        })   
        console.log(result.data);
        setLoading(false);
        if(result.data?.resp){
            toast.error('You have already enrolled in this course');
            setLoading(false);
            return;
        }

        toast.success('Successfully Enrolled in the Course');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong, please try again later');
        }

    }
    
    return (
    <div className='shadow rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:cursor-pointer'>
      <Image src={course?.bannerImage} alt={course?.name}
      width={400} height={300} className="rounded-xl object-cover w-full aspect-video"/>

      <div className='p-3 flex flex-col gap-3'>
        <h2 className='font-bold'>{courseJson?.name}</h2>
        <p className='line-clamp-3 text-gray-500'>{courseJson?.description}</p>

        <div className='flex items-center justify-between'>
            <h2 className='flex items-center gap-2 text-sm'><Book className='text-primary h-5 w-5'/> {courseJson?.noOfChapters} Chapters</h2>
            {course?.courseContent?.length ?<Button 
            className='hover:cursor-pointer'
            disabled={loading}
            onClick={onEnrollCourse}
             size={'sm'}>{loading? <Loader2Icon className='animate-spin'/>:<PlayCircle/>} Enrolle</Button>
            :
            <Link href={`/workspace/edit-course/${course?.cid}`}>
            <Button size={'sm'} className='hover:cursor-pointer' variant='outline'><Sparkle/>  Generate</Button></Link>
            }
        </div>
      </div>
    </div>
  )
}

export default CourseCard
