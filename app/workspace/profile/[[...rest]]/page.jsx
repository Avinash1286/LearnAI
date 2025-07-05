import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <h2 className='font-bold text-3xl mt-5 mb-5'>Manage your account</h2>
      <UserProfile/>
    </div>
  )
}

export default page