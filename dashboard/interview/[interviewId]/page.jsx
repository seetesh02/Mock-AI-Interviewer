"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { mai } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {
    const [interviewData,setinterviewData] = useState();
    const [webcamEnabled,setwebcamEnabled] = useState(false);
    useEffect(()=>{
        
        console.log(params)
        GetInterviewDetails();
    },[])
    const GetInterviewDetails= async()=>{
        const result=await db.select().from(mai)
        .where(eq(mai.mi,params.interviewId))
        console.log(result);
        setinterviewData(result[0]);
    }
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
        <h2 className='font-bold text-2xl'>Lets get started</h2>
        <div>
            {webcamEnabled?
            <Webcam
            onUserMedia={()=>setwebcamEnabled(true)}
            onUserMediaError={()=>setwebcamEnabled(false)}
            style={{
                height:300,
                width:300
            }}/>
            :<>
            <WebcamIcon className='h-72 w-full my-7 p-20  bg-secondary rounded-lg border'/>
            <Button onClick={()=>setwebcamEnabled(true)}>enable webcam and microphone</Button>
            </>
            }
        </div>
        <div>
            <h2><strong>job position:</strong>{interviewData?.jp}</h2>
        </div>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
            <Button className='my-4'>start</Button>
        </Link> 
    </div>
  )
}

export default Interview