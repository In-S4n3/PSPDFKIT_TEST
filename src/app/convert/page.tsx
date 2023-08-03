"use client";
import axios from "axios";
import { useFileContext } from "../context/FileContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Convert = () => {
  const router = useRouter();
  const { file } = useFileContext();
  const [downloadLink, setDownloadLink] = useState("");

  const pdfToWordApi = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const api_endpoint = process.env.NEXT_PUBLIC_API;

    try {
      const { data } = await axios.post(`${api_endpoint}`, formData);

      if (data.success) {
        setDownloadLink(
          `${api_endpoint}/download?file=${encodeURIComponent(data.outputFile)}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex flex-col items-center space-y-5">
      <button className="text-white" onClick={() => pdfToWordApi(file)}>
        CONVERT
      </button>

      {downloadLink && (
        <a
          href={downloadLink}
          download
          className="text-white"
          onClick={() => router.push("/")}
        >
          Download Converted Word
        </a>
      )}
    </main>
  );
};

export default Convert;
