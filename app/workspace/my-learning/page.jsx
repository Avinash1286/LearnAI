import React from 'react'
import WelComeBanner from '../_components/WelComeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'

const page = () => {
  return (
    <div>
      <h2 className='font-bold text-2xl mt-5'>My Learning</h2>
      <EnrollCourseList/>
    </div>
  )
}

export default page
