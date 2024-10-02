"use client"
import { db } from '@/utils/db';
import { mai } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAswerSection from './_components/RecordAswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function StartInterview({params}) {
    const [interviewData,setinterviewData] = useState();
    const [mockInterviewQuestion,setmockInterviewQuestion] = useState([]);
    const [activeQuestionIndex,setactiveQuestionIndex] = useState(0);
    useEffect(()=>{
        
        GetInterviewDetails();
    },[])
    const GetInterviewDetails= async()=>{
        const result=await db.select().from(mai)
        .where(eq(mai.mi,params.interviewId))
        const jsonMockResp=JSON.parse(result[0].jmr)
        console.log(jsonMockResp)
        setmockInterviewQuestion(jsonMockResp);
        setinterviewData(result[0]);
    }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* question */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}/>
            {/* videorecord */}
            <RecordAswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}/>
        </div>
        <div className='flex justify-end gap-6'>
            {activeQuestionIndex>0&&
            <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex-1)}>prev question</Button>}
            {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
            <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex+1)}>next question</Button>}
            {activeQuestionIndex==mockInterviewQuestion?.length-1&&
            <Link href={'/dashboard/interview/'+interviewData?.mi+'/feedback'}>
                <Button>end interview</Button>
            </Link>
            }

        </div>
    </div>
  )
}

export default StartInterview