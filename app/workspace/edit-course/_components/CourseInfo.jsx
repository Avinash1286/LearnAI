"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, PlayCircle, Sparkle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const CourseInfo = ({course,viewCourse}) => {
    const courseLayout=course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router=useRouter();
    const GenerateCourseContent=async ()=> {
        try {
          setLoading(true);
          const result=await axios.post('/api/generate-course-content', {
            courseJson: courseLayout,
            courseTitle: course?.name,
            courseId: course?.cid
          });
          console.log(result.data);
          setLoading(false);
          router.replace('/workspace');
          toast.success("Course content generated successfully!");
        }
        catch (error) {
          console.error("Error generating course content:", error);
          setLoading(false);
          toast.error("Failed to generate course content. Please try again.");
        }
    }
    return (
    <div className='md:flex gap-5 justify-between p-5 rounded-2xl shadow'>
      <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl'>{courseLayout?.name}</h2>
        <p className=' text-gray-500'>{courseLayout?.description}</p>
           
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
        <Clock className='text-blue-500'/>
        <section>
            <h2 className='font-bold'>Duration</h2>
            <h2>2 Hours</h2>
        </section>
      </div>

      <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
        <Book className='text-green-500'/>
        <section>
            <h2 className='font-bold'>Chapters</h2>
            <h2>{course?.noOfChapters}</h2>
        </section>
      </div>

      <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
        <TrendingUp className='text-red-500'/>
        <section>
            <h2 className='font-bold'>Difficulty Level</h2>
            <h2 className='bg-gray-500 w-fit px-3 rounded-full mt-1 text-white'>{course?.level}</h2>
        </section>
        </div>
        </div>
        {!viewCourse ?<Button disabled={loading} onClick={GenerateCourseContent}><Sparkle/> Generate Content</Button>
        :
        <Link href={'/course/'+course?.cid}>
        <Button className="hover:cursor-pointer"><PlayCircle/> Continue Learning</Button></Link>
        }
      </div>
      {course?.bannerImage ? (
  <Image
    src={course.bannerImage}
    alt="Course Banner"
    width={400}
    height={400}
    className='rounded-lg object-cover aspect-auto w-full h-[240px] mt-5 md:mt-0'
  />
) : null}
    </div>
  )
}

export default CourseInfo
