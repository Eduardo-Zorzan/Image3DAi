"use client";

import { useState } from "react";
import { permanentRedirect } from "next/navigation";
import $ from "jquery";

import { progressResponse } from "@/classes/progress";
import { CircularProgressbar } from 'react-circular-progressbar';
import { createDrlFiles } from '@/helpers/createDropdown';
import 'react-circular-progressbar/dist/styles.css';

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

    const redirectToVisualizer = () => {
        const select : HTMLSelectElement = $("#drlFiles select")[0] as HTMLSelectElement;

        if (select && select.selectedOptions.length > 0) {
            const optionSelected = select.selectedOptions[0];
            permanentRedirect(`/3D?fileName=${optionSelected.value}`);
        }
    }

    return (
        <div className="flex flex-col">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
            Prompt
        </label>
        <textarea
            id="prompt"
            name="prompt"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your prompt here..."
        />
        <button
            type="submit"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
            rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick= { handleSubmit }
        >Send</button>

        {loading ? 
        <div className="bg-black bg-opacity-50 w-full h-full absolute">
            <div className="w-sm h-auto">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
        </div> : <p></p>}

        <button 
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
            rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={redirectToVisualizer}>
            Open Image
        </button>
        </div>
    );
}