"use client"
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAimodal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const [userAnswer,setuserAnswer] = useState('')
    const {user} = useUser();
    const [loading,setloading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    useEffect(()=>{
        results.map((result)=>(
            setuserAnswer(prevAns=>prevAns+result?.transcript)
        ))
    },[results])

    const SaveUserAnswer=async()=>{
      if(isRecording){
        setloading(true);
        stopSpeechToText()
        if(userAnswer?.length<10){
          setloading(false);
          toast('error record again')
          return;
        }
        const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question
        +", User Answer:"+userAnswer+", depends on user answer given interview question"+
        "please give us rating for answer and feedback as area of improvment if any"+
        "just 3 to 5 lines in json format with rating feild and feedback feild"

        const result =await chatSession.sendMessage(feedbackPrompt)
        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(mockJsonResp);
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
        const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef:interviewData?.mi,
          question:mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          usserAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY')
        })

        if(resp){
          toast('answer saved sucessfuly')
        }
        setResults([]);
        setuserAnswer('');
        setloading(false);
      }
      else{
        startSpeechToText();
      }
    }
  return (
    <div>
        <div className='flex flex-col justify-centre items-centre bg-secondary p-5'>
            RecordAswerSection
            <Webcam
            style={{
                height:100,
                width:'100%',
                zIndex:10,
            }}/>
        </div>
        <Button
        disabled={loading}
        onClick={SaveUserAnswer}> 
            {isRecording?
            <h2>
                <Mic/> 'Recording..'
            </h2>:'Record answer'}
        </Button>
        {/* <Button onClick={()=>console.log(userAnswer)}>show asnwer</Button> */}
    </div>
  )
}

export default RecordAswerSection