import { Prompt } from "@/components/prompt";
import { Visualizer } from "@/components/visualizer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px_1fr_1fr] items-center justify-items-center min-h-screen 
      p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-lg ">
      <main className="flex flex-col justify-center gap-[32px] row-start-2 items-center sm:items-start bg-purple-100 w-2xl p-4 rounded-lg">
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

        <div className="flex gap-4 items-center flex-col w-md ">
          <Prompt />
          <Visualizer />
        </div>
      </main>
    </div>
  );
}
