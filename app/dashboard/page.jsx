import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function Dasboard() {
  return (
    <div className='p-4'>
      <h2 className='font-bold text:2xl'>Dashboard</h2>
      <h2>Create and Start your AI Mockup Interview</h2>

      {/* Grid container with responsive column layout and gap between items for new interviews.*/}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <AddNewInterview />
      </div>

    </div>
  )
}

export default Dasboard