import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Book, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const EnrollCourseCard = ({course,enrollCourse}) => {
  const courseJson=course?.courseJson?.course;
  const CalculatePerProgress = () => {
  const completed = enrollCourse?.completedChapters?.length ?? 0;
  const total = course?.courseContent?.length ?? 1;
  return ((completed / total) * 100).toFixed(0); // toFixed(0) for integer percent
}
  return (
     <div className='shadow rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:cursor-pointer'>
      <Image src={course?.bannerImage} alt={course?.name}
      width={400} height={300} className="rounded-xl object-cover w-full aspect-video"/>

      <div className='p-3 flex flex-col gap-3'>
        <h2 className='font-bold'>{courseJson?.name}</h2>
        <p className='line-clamp-3 text-gray-500'>{courseJson?.description}</p>

        <div className='flex flex-col items-center justify-between'>
            <div className='w-full'>
            <h2 className='flex justify-between text-sm text-primary'>Progress <span>{CalculatePerProgress()}%</span></h2>
            <Progress value={CalculatePerProgress()}/>
            <Link href={'/workspace/view-course/'+course?.cid}>
            <Button className="w-full mt-3 hover:cursor-pointer"><PlayCircle/>Continue</Button>
            </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollCourseCard
