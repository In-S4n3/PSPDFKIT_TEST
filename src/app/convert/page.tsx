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

    const { data } = await axios.post(`http://localhost:8008`, formData);

    if (data.success) {
      setDownloadLink(
        `http://localhost:8008/download?file=${encodeURIComponent(
          data.outputFile
        )}`
      );
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
