import React from 'react'
import WelComeBanner from './_components/WelComeBanner'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'

const WorkSpace = () => {
  return (
    <div>
      <WelComeBanner/> 
      <EnrollCourseList/>
      <CourseList/>
    </div>
  )
}

export default WorkSpace
