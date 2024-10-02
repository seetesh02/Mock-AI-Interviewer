import { UserButton } from '@clerk/nextjs'
import React from 'react'

function header() {
  return (
    <div className='flex p-4 items-center justify-between'>
        <ul className='flex gap-4'>
            <li>home</li>
            <li>home</li>
            <li>home</li>
            <li>home</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default header