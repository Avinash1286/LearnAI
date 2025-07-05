"use client";
import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Cross, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';

const ChapterContent = ({courseInfo,refreshData}) => {
    const course=courseInfo?.courses;
    const {courseId}=useParams();
    const [loading,setLoading]=useState(false);
    const enrollCourse=courseInfo?.enrollCourse;
    const courseContent=course?.courseContent;
    const [selectedChapterIndex,setSelectedChapterIndex]=useContext(SelectedChapterIndexContext);
    const videoData=courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics=courseContent?.[selectedChapterIndex]?.courseData?.topics;
    let completedChapter=enrollCourse?.completedChapters?? [];

    const markChapterComplete = async () => {
            setLoading(true);
            completedChapter.push(selectedChapterIndex);
            const result=await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChapter
        })
        console.log(result.data);
        refreshData();
        toast.success('Chapter marked as completed!');
        setLoading(false);
     }

     
    const markChapterInComplete = async () => {
            setLoading(true);
            const completeChap=completedChapter.filter((chapter) => chapter !== selectedChapterIndex);
            const result=await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completeChap
        })
        console.log(result.data);
        refreshData();
        toast.success('Chapter marked as incompleted!');
        setLoading(false);
     }
  return (
    <div className='p-10 ml-80'>
    <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl'>{courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>

    {!completedChapter?.includes(selectedChapterIndex) ?
      <Button
      disabled={loading} 
      onClick={() => markChapterComplete()}
      className="hover:cursor-pointer" >
      {loading? <Loader2Icon className='animate-spin'/> : <CheckCircle />}  
       Mark as Completed</Button>
      :
      <Button 
       disabled={loading}
      onClick={() => markChapterInComplete()}
      className="hover:cursor-pointer" variant="outline">{loading?<Loader2Icon className='animate-spin'/> :<X/>} Mark Incomplete</Button>
      }

    </div>
    <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {videoData?.map((video, index) =>(
            <div key={index}>
                <YouTube
                    videoId={video?.videoId}
                    opts={{
                        height: '250',
                        width: '400',
                        
                    }}
                />
            </div>
        ))}
    </div>

    <div className='mt-7'>
       {topics?.map((topic, index) => (
        <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
            <h2 className='font-bold text-2xl text-primary'>
             {index+1}.   {topic?.topic}
            </h2>

            <div dangerouslySetInnerHTML={{__html: topic?.content}}
            style={{
                lineHeight: '1.8',
            }}
            ></div>
        </div>
       ))}
    </div>
    
    </div>
  )
}

export default ChapterContent
