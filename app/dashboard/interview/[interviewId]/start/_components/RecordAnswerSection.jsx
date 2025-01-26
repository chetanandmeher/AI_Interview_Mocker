import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast';
import { chatSession } from '@/utils/GeminiAIModel';
import { Mic, Webcam, WebcamIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';

function RecordAnswerSection({mockInterviewQuestions, activeQuestionIndex}) {

    // Ensure mockInterviewQuestions[0] is an array
    const questions = Array.isArray(mockInterviewQuestions) && mockInterviewQuestions.length > 0 ? mockInterviewQuestions[0] : [];
   
    const [userAnswer, setUserAnswer] = React.useState('');

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    }); 
    // 
// 7205548190
    // update result as the userAnswer whenever it's change 
    useEffect(() => {
        results.map((results) => (
            setUserAnswer(preAns => preAns + results?.transcript)
        ))
    }, [results])

    // save the Use Answer along with the feedback
    const SaveUserAnswer = async() => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.lenght < 10) {
                toast("Error while saving your answer!. Please try again.");
                return;
            }

            // fetch the feedback
            const feedbackPrompt = "Question:"+questions[activeQuestionIndex]?.question+",\n User Answer: "+userAnswer+",\n depend on user answer for the given question, please give us rating for answer and feedback as area of improvement in just 3 to 5 lines to improve it in JSON format with rating field and feedback field in just 3 to 5 lines to improve it."
             
            const feedbackAndRating = await chatSession.sendMessage(feedbackPrompt);  

            // # remove the extra tags from response
            const feedbackAndRatingJSONResponse = (feedbackAndRating.response.text()).replace(/```json/g, "").replace(/```/g, "").trim();
            console.log("feedbackAndRatingJSONResponse: ", feedbackAndRatingJSONResponse);
            //convert 

        } else {
            startSpeechToText();
        }
    }

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;


    return (
        <div className='flex flex-col'>
            <div className='flex flex-col justify-center items-center bg-secondary p-5 rounded-lg mt-5'>
                {/* <WebcamIcon width={200} height={200} className='absolute'/> */}
                <Webcam
                    mirrored={"true"}
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10
                    }}
                />
            </div>

            {/* Recording button */}
            <div className='flex justify-center items-center h-full flex-col'>
                <Button variant='outline' className='mt-10'
                    onClick={SaveUserAnswer}>
                    {isRecording ?
                        <h2 className='flex gap-2 text-red-700 font-bold'>
                            <Mic />Stop Recording
                        </h2>
                        : "Record Answer"
                    }
                </Button>

                {/* show the answer in console */}
                <Button className="my-5" onClick={() => console.log(userAnswer)}>
                    Show Answer
                </Button>
            </div>

        </div>
    )
}

export default RecordAnswerSection