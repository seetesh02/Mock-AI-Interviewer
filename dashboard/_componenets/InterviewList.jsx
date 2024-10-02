"use client"
import { db } from '@/utils/db';
import { mai } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemcard from './InterviewItemcard';

function InterviewList() {
    const {user} = useUser();
    const [interviewList,setinterviewList] = useState([]);
    useEffect(()=>{
        user&&GetinterviewsList();
    },[user])
    const GetinterviewsList = async()=>{
        const result =await db.select()
        .from(mai)
        .where(eq(mai.cb,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(mai.id));
        console.log(result);
        setinterviewList(result);
    }
  return (
    <div>
        <h2 className='font-medium text-lg'>Previous mockinterview list</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {interviewList&&interviewList.map((item,index)=>(
                <InterviewItemcard
                item={item}
                key={index}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList