"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  

function Feedback({params}) {
    const [feedbackList,setfeedbackList] = useState([]);
    const router = useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback= async()=>{
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.interviewId))
        .orderBy(UserAnswer.id);
        console.log(result);
        setfeedbackList(result)
    }
  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'> congratulations</h2>
        <h2 className='font-bold text-2xl'> here is your information</h2>
        <h2 className='text-primary text-lg my-3'> your overall interview rating"<strong>10/11</strong></h2>
        <h2> look below</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index}>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left'>{item.question}</CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='p-2 border rounded-lg'><strong>rating:</strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm'><strong>your answer:</strong>{item.usserAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm'><strong>correct answer:</strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm'><strong>feedback:</strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
        ))}
        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback