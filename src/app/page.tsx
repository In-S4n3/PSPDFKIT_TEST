"use client";
import { useRouter } from "next/navigation";
import { useFileContext } from "./context/FileContext";

export default function Home() {
  const { setFile, setBuffer } = useFileContext();
  const router = useRouter();

  const handleChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
      const buffer: any = await event.target.files[0].arrayBuffer();
      setBuffer(buffer);
      router.push("/convert");
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
    </main>
  );
}
