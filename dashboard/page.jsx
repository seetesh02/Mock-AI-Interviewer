import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Addinterview from './_componenets/Addinterview'
import InterviewList from './_componenets/InterviewList'
function Dashboard() {
  return (
    <div className='p-10'> 
      Dashboard
      <h2>create one</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-4'>
        <Addinterview/>
      </div>
      {/* previous interviews */}
      <InterviewList/>
    </div>
  )
}

export default Dashboard