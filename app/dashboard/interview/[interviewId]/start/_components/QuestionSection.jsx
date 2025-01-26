"use client"

import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function QuestionSection({ mockInterviewQuestions = [], activeQuestionIndex }) {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (Array.isArray(mockInterviewQuestions) && mockInterviewQuestions.length > 0) {
      console.log("mockInterviewQuestions[0].length::  ", mockInterviewQuestions[0].length);
      console.log("mockInterviewQuestions[0]::  ", mockInterviewQuestions[0]);
    }
    console.log("activeQuestionIndex:: ", activeQuestionIndex);

    // Fetch available voices
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Fetch voices when they are loaded
    window.speechSynthesis.onvoiceschanged = fetchVoices;
    fetchVoices();
  }, [mockInterviewQuestions, activeQuestionIndex]);

  // Ensure mockInterviewQuestions[0] is an array
  const questions = Array.isArray(mockInterviewQuestions) && mockInterviewQuestions.length > 0 ? mockInterviewQuestions[0] : [];

  // Text to speech function
  const textToSpeech = (text, voiceName) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices[2];
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser doesn't support text to speech.");
    }
  };

  return (
    <div>
      {Array.isArray(questions) && questions.length > 0 && (
        // Displaying the questions
        <div className='p-5 my-5 rounded-lg border'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {questions.map((question, index) => (
              <div key={index}>
                {/* question  index */}
                <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer hover:shadow-md transition-all
                  ${activeQuestionIndex === index && "bg-blue-600 text-white"}`}>
                  Question #{index + 1}
                </h2>
              </div>
            ))}
          </div>
          {/* Display the question */}
          <h2 className='my-5 text-md md:text-lg'>{questions[activeQuestionIndex]?.question}</h2>
          
          {/*Listen the question*/}
          <Volume2 className='cursor cursor-pointer' onClick={()=>textToSpeech(questions[activeQuestionIndex]?.question)}/>

          <div className='bg-blue-100 border rounded-lg p-3 my-7'>
            <h2 className='flex gap-2 text-primary text-center'>
              <Lightbulb/>
              <strong>Note:</strong>
            </h2>
            <p className='text-md text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionSection;