"use client";
import { useRouter } from "next/navigation";
import { useFileContext } from "./context/FileContext";

export default function Home() {
  const { setFile } = useFileContext();
  const router = useRouter();

  const handleChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const buffer: any = await event.target.files[0].arrayBuffer();
      setFile(buffer);
      router.push("/editor");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="file"
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </main>
  );
}
