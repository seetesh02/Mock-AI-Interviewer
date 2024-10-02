import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemcard({item}) {
  const router = useRouter();
  const onStart =()=>{
    router.push('/dashboard/interview/'+item?.mi)
  }
  const onFeedback =()=>{
    router.push('/dashboard/interview/'+item?.mi+'/feedback')
  }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{item.jp}</h2>
      <h2 className='text-sm text-gray-500'>{item.je} years of experience</h2>
      <h2 className='text-xs text-gray-500'>Created at:{item.ca}</h2>
      <div className=' flex justify-between mt-2 gap-5'>
        <Button size="sm" variant="outline" onClick={onFeedback}>feedback</Button>
        <Button onClick={onStart}>start</Button>
      </div>
    </div>
  )
}

export default InterviewItemcard