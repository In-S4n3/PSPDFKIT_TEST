"use client";
import {
  createContext,
  useState,
  Dispatch,
  useContext,
  SetStateAction,
} from "react";

interface EditorContextTypes {
  file: undefined;
  setFile: Dispatch<SetStateAction<undefined>>;
}

const FileContext = createContext<EditorContextTypes>({
  file: undefined,
  setFile: () => undefined,
});

export const FileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [file, setFile] = useState(undefined);

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
