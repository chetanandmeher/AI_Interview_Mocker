"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/database'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from '@/utils/schema'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import pool from '@/utils/database'


function AddNewInterview() {
    const [openDialog, setOpenDialog] = React.useState(false)
    // variable to store dialog box details
    const [jobPosition, setJobPosition] = React.useState('')
    const [jobDescription, setJobDescription] = React.useState('')
    const [jobExperience, setJobExperience] = React.useState('')
    // setup lodaing while generating data from the gemini api
    const [loading, setLoading] = React.useState(false)
    // Save the response from the gemini api
    const [jsonResponse, setJsonResponse] = React.useState()
    // Initialize the router
    const router = useRouter()
    // get user data
    const user = useUser().user
    // console.log("user: ", user);
    const onSubmit=async(e)=>{
        // set the loading to true
        setLoading(true)

        e.preventDefault() // Prevents the default form submission behavior
        // create a new mock interview
        console.log('Job Position:',jobPosition);
        console.log('Job Description:',jobDescription);
        console.log('Job Experience:',jobExperience);
        
        try {
        // Input promt for the user to give the interview questions and answers
        const InputPromt = "Job Position: "+jobPosition+"\nJob Description: "+jobDescription+"\nJob Experience: "+jobExperience + 
                            "\nbased on this information give me "+process.env.NEXT_PUBLIC_NUMBER_OF_QUESTIONS+" interview questions along with the answers in JSON format. Give me question and answer field in JSON."; 
        console.log("inputPrompt:\n",InputPromt);

        
        const result= await chatSession.sendMessage(InputPromt);
        // # remove the extra tags from response
        const MockJsonResponse = (result.response.text()).replace(/```json/g, "").replace(/```/g, "").trim();
        // console.log("RawResponse:\n",MockJsonResponse);
        console.log('Result:',JSON.parse(MockJsonResponse));
        
        // set the response from the gemini api in text format
        setJsonResponse(MockJsonResponse);
        
        // push the data in the database table
        const primaryEmailAddress = user?.primaryEmailAddress?.emailAddress;
        console.log("emailAddress: ", primaryEmailAddress);
        if (MockJsonResponse){
            const response = await db.insert(MockInterview)
            .values({
                jsonMockResponse: MockJsonResponse,
                jobPosition: jobPosition,
                jobDescription: jobDescription,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
                mockId: uuidv4()
            })
            .returning({mockId:MockInterview.mockId});
            console.log('Inserting Mock ID: ',response);
        }else { 
            console.log('Error in generating response from AI');
        }
    } catch (error) {   
        console.log('Error in generating response from AI',error);
    }
        // setloading to false
        if (response){
            setLoading(false);
            // route to the interview page
            router.push("/dashboard/iterview/"+response[0]?.mockId)

        } 
    };

  return (
    <div>
        <div className='p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer'
            onClick={()=>setOpenDialog(true)}> 
            <h2 className='font-bold text-center text-lg'>+ Add New</h2>
        </div>
        {/* Creating a dialog box for adding details of new mock interview */}
        <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
        <DialogContent className='max-w-xl'>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
           
                <form onSubmit={onSubmit}>
                <DialogDescription>
                    {/* Add inputs areas for neccesary details to start interview */}
                    <div>
                        <h2 className='font-bold text-2xl'></h2>
                        <p>Add details about your job position/role, Job description, and years of experience.</p>
                        <div className='mt-7 my-3 '>
                            <lable>Job role / Job position</lable>
                            <Input placeHolder='Ex: Java developer' required 
                                onChange={(event)=>setJobPosition(event.target.value)}/>
                        </div>
                        <div className='my-3 '>
                            <lable>Job Description / Tech Stack (In Short)</lable>
                            <Textarea placeHolder='Ex: Java, SpringBoot, MySQL etc..' required
                             onChange={(event)=>setJobDescription(event.target.value)} />
                        </div>
                        <div className='my-3 '>
                            <lable>Years of experience</lable>
                            <Input placeHolder='Ex: 4' type='number' max='50' required
                            onChange={(event)=>setJobExperience(event.target.value)}/>
                        </div>
                        
                    </div>
                    {/* Add the cancle and Start button to continue or go back from dialog box, */}
                    <div className='gap-5 justify-end flex mt-1'>
                        <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                        <Button type='submit'disabled = {loading} >
                        {/* If loading is true, show the loading spinner and "Generating from AI" text, otherwise show "Start Interview" */}
                           { loading ?
                            <><LoaderCircle size={20} className='animate-spin' />"Genrating from AI" </>
                            : "Start Interview"
                            };
                        </Button>
                    </div>
                </DialogDescription>
                </form>
           
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview