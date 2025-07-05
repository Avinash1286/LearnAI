"use client";
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

const EditCourse = ({viewCourse=false}) => {
  const [loading, setLoading] =useState(false);
  const {courseId}=useParams();
  const [course, setCourse] = useState();
  console.log(courseId);

  const GetCouseInfo=async ()=>{
    setLoading(true);
    const result=await axios.get(`/api/courses?courseId=${courseId}`);
    console.log(result.data);
    setCourse(result.data);
    setLoading(false);
  }

  useEffect(() => {
    GetCouseInfo();
  }, []);
  return (
    <div>
      <CourseInfo course={course} viewCourse={viewCourse}/>
      <ChapterTopicList course={course}/>
    </div>
  )
}

export default EditCourse
