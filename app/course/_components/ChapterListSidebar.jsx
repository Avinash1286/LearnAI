import { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
const ChapterListSidebar = ({courseInfo}) => {
    const course=courseInfo?.courses;
    const enrollCourse=courseInfo?.enrollCourse;
    const courseContent=courseInfo?.courses.courseContent;
    const [selectedChapterIndex,setSelectedChapterIndex]=useContext(SelectedChapterIndexContext);
    let completedChapter=enrollCourse?.completedChapters?? [];
    return (
    <div className='w-80 bg-secondary h-screen p-5 fixed'>
    <h2 className='my-3 font-bold text-xl'>
    Chapters</h2>
        
         <Accordion  type="single" collapsible className='overflow-auto h-[calc(100vh-100px)]'>
        {courseContent?.map((chapter, index) => (
          <AccordionItem onClick={()=>setSelectedChapterIndex(index)} key={index} value={chapter.courseData.chapterName}>
                  <AccordionTrigger  className={`p-4 ${completedChapter.includes(index)? 'bg-green-400 text-white':''}`}>{index+1}. {chapter.courseData.chapterName}</AccordionTrigger>
                  <AccordionContent asChild>
                      <div>
                        {chapter?.courseData?.topics.map((lesson, index_) => (
                            <h2 className={` rounded-lg my-1 p-4 hover:cursor-pointer ${completedChapter.includes(index)? 'bg-green-400 text-white':'bg-white'}`} key={index_}>{lesson?.topic}</h2>
                        ))}
                      </div>
                  </AccordionContent>
              </AccordionItem> 
        ))}      
          </Accordion>
          
    </div>
  )
}

export default ChapterListSidebar
