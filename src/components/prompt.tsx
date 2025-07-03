"use client";

import { useState } from "react";
import $ from "jquery";

import { progressResponse } from "@/classes/progress";
import { CircularProgressbar } from 'react-circular-progressbar';
import { createDrlFiles } from '@/helpers/createDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import 'react-circular-progressbar/dist/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css'

export const Prompt = () => {
    const [loading, setLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);
    
    const handleSubmit = async () => {
        setLoading(true)

        const prompt = document.getElementById("prompt") as HTMLTextAreaElement;

        const pooling = async () => {
            const interval = setInterval(async () => {
                const progress = await fetch("/api/progress", {
                    method: "GET",
                    })
            
                    const progressResult: progressResponse = await progress.json();
                    
                    setPercentage(Math.round(progressResult.progress * 100));
                    console.log(progressResult.progress)
                    if (progressResult.progress === 1 || progressResult.progress === 0)
                        clearInterval(interval);
            }, 200)
        }

        await pooling();
        const response = await fetch("/api/AI", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: prompt.value
        }),
        })

        const data = await response.json();
        console.log(data);
        createDrlFiles();
        setLoading(false);
        
    }

    return (
        <div className="flex flex-col w-full ">
            <label htmlFor="prompt" className="text-lg font-medium ">
                Prompt
            </label>
            <textarea
                id="prompt"
                name="prompt"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg bg-gray-200 p-2"
                placeholder="Enter your prompt here..."
            />
            <div className="flex flex-column justify-between gap-2 w-full text-lg">
                <input className="w-full bg-gray-200 mt-2 rounded-md shadow-sm sm:text-lg block focus:border-blue-500 px-1" type="text" 
                 placeholder="Enter the name of the 3D ambient generated"/>
                <button
                    type="submit"
                    className="w-xs p-1 mt-2 inline-flex justify-center items-center border border-transparent text-sm font-medium 
                    rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick= { handleSubmit }
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <p className="ml-2 text-center">Send</p>
                </button>

            </div>

            {loading ? 
            <div className="bg-black bg-opacity-50 w-full h-full absolute">
                <div className="w-sm h-auto">
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
                </div>
            </div> : <p></p>}
        </div>
    );
}