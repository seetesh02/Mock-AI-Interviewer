"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
  import { Button, buttonVariants } from "@/components/ui/button"
import { chatSession } from '@/utils/GeminiAimodal'
import { db } from '@/utils/db'
import { mai } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
  
function Addinterview() {
  const [jp,setJp]=useState();
  const [jd,setJd]=useState();
  const [je,setJe]=useState();
  // const [jp,setJp]=useState();
  const [jsonResponse,setJsonResponse]=useState([]);
  const {user}=useUser();
  const router=useRouter();
  const onSubmit=async(e)=>{
    e.preventDefault()
    console.log(jp,jd,je)
    const InputPrompt="Job Position:"+jp+", job Description:"+jd+" Years of experience:"+je+", based on this information give me"+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+"questions with answers in json formatGive question and answers as field in JSON"
    const result=await chatSession.sendMessage(InputPrompt);
    const mockresult=(result.response.text()).replace('```json','').replace('```','');
    console.log(JSON.parse(mockresult));
    setJsonResponse(mockresult);
    if(mockresult){
      const resp=await db.insert(mai)
      .values({
        mi:uuidv4(),
        jmr:mockresult,
        jp:jp,
        jd:jd,
        je:je,
        cb:user?.primaryEmailAddress?.emailAddress,
        ca:moment().format('DD-MM-YYYY')
      }).returning({mockId:mai.mi})
      console.log("inseted id",resp)
      if(resp){
        router.push('/dashboard/interview'+resp[0]?.mi)
      }
    }
    else{
      console.log("ERROR");
    }
  }
  return (
    <div >
      {/* <div className='p-10 border rounded-lg  bg-slate-100 hover:scale-105 cursor-pointer'>
            <h2 className='text-center'> Addinterview</h2>
        </div> */}
        <Dialog>
            <DialogTrigger>
              <div className='p-10 border rounded-lg  bg-slate-100 hover:scale-105 cursor-pointer'>
                <h2 className='text-center'> Addinterview</h2>
              </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>tell me more about your experience</DialogTitle>
                <DialogDescription>
                  <form onSubmit={onSubmit}>
                   <div>
                    <h2>add details</h2>
                    <div className='mt-7 '>
                      <label >job role/job description</label>
                      <Input placeholder="backend" required 
                      onChange={(e)=>setJp(e.target.value)}/>
                    </div>
                    <div className='my-2'>
                      <label >tech stack familiar with</label>
                      <Textarea placeholder="react next.js" required
                      onChange={(e)=>setJd(e.target.value)}/>
                    </div>
                    <div className='my-2'>
                      <label >no. years of experience</label>
                      <Input placeholder="ex.5" type="number" required max="50"
                      onChange={(e)=>setJe(e.target.value)}/>
                    </div>
                    <div>
                      <Button className="text-end">start interview</Button>
                    </div>
                   </div>
                   </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
       
    </div>
  )
}

export default Addinterview