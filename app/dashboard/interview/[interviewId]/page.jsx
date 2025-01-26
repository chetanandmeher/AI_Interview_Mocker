"use client"

import { Button } from '@/components/ui/button';
import { db } from '@/utils/database';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
  // variable for saving interview data
  const [interviewData, setInterviewData] = React.useState({});
  // webcam status
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);

  // printing the mockId
  useEffect(() => {
    console.log("params: ", params.interviewId);
    GetInterviewDetails();
  }, [])

  // fetching the interview data with the help of mockId/InterviewId
  const GetInterviewDetails=async()=>{
    const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, params.interviewId))

    setInterviewData(result[0]);
    console.log("Interview Data: ", result[0]);
  }



  return (
    <div className=' my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '> 
        {/* Displaying the interview data */}
        <div className='flex flex-col  my-10 gap-3 '>
          <div className='flex flex-col gap-5 p-5 rounded-lg border'>
          <h2 className='text-lg'><strong>Job Decription/Tech Stack: </strong>{interviewData.jobDescription}</h2>
          <h2 className='text-lg'><strong>Years of Experience </strong>{interviewData.jobExperience}</h2>
          <h2 className='text-lg'><strong>Job Role/Job Position: </strong>{interviewData.jobPosition}</h2>
          </div>
          {/* For Informations/Note */}
          <div className='flex flex-col  p-5 rounded-lg border border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 text-center text-yellow-600'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='flex text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATIONS}</h2>
          </div>

        </div>
        {/* accessing webcam */}
        <div>
          {webcamEnabled ? 
          <Webcam
          onUserMedia={()=>setWebcamEnabled(true)}
          onUserMediaError={()=>setWebcamEnabled(false)}
          mirrored={true}
          style={{
              height: 300,
              width: 300,
              borderRadius: '10px',
            }
          } />:
          <>
          <WebcamIcon className=' h-72 w-full bg-secondary p-10 rounded-lg border my-5'/>
          <Button variant="ghost" className='w-full' onClick={()=>setWebcamEnabled(true)}>Enable Web Cam & Microphone</Button>
          </>
          }
        </div>
      </div>
          {/* Start the interview button/ navigating to start page */}
          <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/' + params.interviewId +'/start'}>
              <Button className='w-40' onClick={()=>console.log('Start Interview')}>Start Interview</Button>
            </Link>
          </div>
        
    </div> 
    
  
  );
}

export default Interview