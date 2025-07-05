import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppHeader = ({hide=false}) => {
  return (
    <div className='flex justify-between p-4 item-center shadow-sm'>
      {!hide &&<SidebarTrigger/>}
      <UserButton/>
    </div>
  )
}

export default AppHeader
