"use client";
import { useRouter } from "next/navigation";
import { useFileContext } from "./context/FileContext";
import { useState } from "react";

export default function Home() {
  const { setFile, setBuffer } = useFileContext();
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();

  const handleChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
      const buffer: any = await event.target.files[0].arrayBuffer();
      setBuffer(buffer);
      if (i) setPopUp(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <input
        type="file"
        onChange={(e) => {
          handleChange(e);
        }}
        className="border-white border-2 p-3 rounded text-cyan-300"
      />

      {popUp && (
        <div className="flex justify-around text-white space-x-3 items-center">
          <button
            onClick={() => router.push("editor")}
            className="border-2 border-cyan-500 p-2 rounded"
          >
            Edit
          </button>
          <p>OR</p>
          <button
            onClick={() => router.push("convert")}
            className="border-2 border-cyan-500 p-2 rounded"
          >
            Convert
          </button>
        </div>
      )}
    </main>
  );
}
