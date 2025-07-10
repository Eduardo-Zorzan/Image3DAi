'use client';

import { Prompt } from "@/components/prompt";
import { Visualizer } from "@/components/visualizer";
import { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';

export default function Home() {
  const [data, setData] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const getLoading = (isLoading : boolean) => {
    setData(isLoading);
  }

  return (
    <div className="grid items-center h-screen justify-items-center font-[family-name:var(--font-geist-sans)] text-lg ">
      <main className="flex flex-col justify-center gap-[32px] items-center sm:items-start bg-purple-100 w-2xl p-4 rounded-lg">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left text-lg font-[family-name:var(--font-geist-mono)]">
          <li className="tracking-[-.01em] text-lg">
            Write a Prompt
          </li>
          <li className="tracking-[-.01em] text-lg">
            Click on "Send" to generate a 3D ambient with Stable Difussor
          </li>
          <li className="tracking-[-.01em] text-lg">
            Select the ambient generate on the combo
          </li>
          <li className="tracking-[-.01em] text-lg">
            Click on "Open Ambient" load the 3D ambient on another tab
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col w-full ">
          <Prompt returnLoading={getLoading} returnPercentage={setPercentage} />
          <Visualizer />
        </div>
        {data ? 
          <div className="absolute self-center z-10 w-full h-full flex justify-center items-center">
            <div className="absolute inset-0 bg-black/30 z-0 rounded" />
            <div className="z-20 w-75">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
          </div> : ""}
      </main>
     
    </div>
  );
}
