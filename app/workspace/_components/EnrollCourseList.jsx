"use client"
import axios from 'axios'
import { useEffect, useState } from 'react';
import EnrollCourseCard from './EnrollCourseCard';

const EnrollCourseList = () => {
 const [enrolledCourseList, setEnrolledCourseList] = useState([]);
  useEffect(() => {
    GetEnrolledCourse();
  }, []);  
  const GetEnrolledCourse=async () => {
    const result=await axios.get('/api/enroll-course');
    console.log(result.data);
    setEnrolledCourseList(result.data);
  }  
  return (
    <div className='mt-3'>
       <h2 className='font-bold text-xl'>Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
       {enrolledCourseList?.map((course, index) => (
        <EnrollCourseCard enrollCourse={course?.enrollCourse} key={index} course={course?.courses}/>
       ))}
        </div>
    </div>
  )
}

export default EnrollCourseList
