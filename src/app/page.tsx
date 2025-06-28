import { Prompt } from "@/components/prompt";
import { ComboBox } from "@/components/comboBox";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px_1fr_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Make the upload of the photos{" "}
          </li>
          <li className="tracking-[-.01em]">
            Click on "Render" to generate the 3D view.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Prompt />
          <ComboBox />
        </div>
      </main>
    </div>
  );
}
