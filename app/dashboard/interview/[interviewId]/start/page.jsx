"use client"

import { db } from '@/utils/database';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview({ params }) {
    // initialize the interview data variables
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const [interviewId, setInterviewId] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    // unwrap the params object
    useEffect(() => {
        async function fetchParams() {
            const unwrappedParams = await params;
            setInterviewId(unwrappedParams.interviewId);
        }
        fetchParams();
    }, [params]);

    // print the interviewID
    useEffect(() => {
        if (interviewId) {
            console.log("params in start page: ", interviewId);
            GetInterviewDetails();
        }
    }, [interviewId]);

    // fetching the interview data with the help of mockId/InterviewId
    const GetInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));


        // get and set the interviewData and the mock interview questions
        const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);
        // console.log("jsonMockResponse: ", jsonMockResponse);
        setMockInterviewQuestions(jsonMockResponse);
        setInterviewData(result[0]);
    
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
                {/* Questions */}
                <QuestionSection 
                mockInterviewQuestions={Object.values(mockInterviewQuestions)}
                activeQuestionIndex={activeQuestionIndex}
                /> 
                
                {/* Web Cam and Audio recording */}
                <RecordAnswerSection
                mockInterviewQuestions={Object.values(mockInterviewQuestions)}
                activeQuestionIndex={activeQuestionIndex}
                />
            </div>
        </div>
    )
}

export default StartInterview