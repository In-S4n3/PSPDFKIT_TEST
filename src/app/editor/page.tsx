"use client";
import React, { useEffect, useRef } from "react";
import { useFileContext } from "../context/FileContext";

export default function Editor() {
  const containerRef = useRef(null);
  const { file } = useFileContext();

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit: any;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }

      const fetcher = async (fontFileName: string) => {
        const hostname = window.location.origin;
        const r = await fetch(`${hostname}/fonts/${fontFileName}`);
        if (r.status === 200) {
          return r.blob();
        } else {
          throw new Error();
        }
      };

      const customFonts = ["Roboto.ttf"].map(
        (font) => new PSPDFKit.Font({ name: font, callback: fetcher })
      );

      await PSPDFKit.load({
        customFonts,
        toolbarItems: [
          ...PSPDFKit.defaultToolbarItems,
          { type: "content-editor" },
        ],
        container,
        document: file,
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [file]);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
}
