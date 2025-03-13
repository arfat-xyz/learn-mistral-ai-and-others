"use client";
import { formatData, removeDashFromString } from "@/lib/utils-function";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { CgSpinnerTwo } from "react-icons/cg";
import RainbowHeading from "./rainbow-heading";
import { RawData, ShowFormat } from "@/lib/interface";

const InputFileClientComponent = ({
  endPoints = "",
  heading = "AI",
  buttonText = "Upload file",
  showingFormat = "JSON",
}: {
  endPoints?: string;
  heading?: string;
  buttonText?: string;
  showingFormat?: ShowFormat;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rawData, setRawData] = useState<RawData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState({ name: "", size: 0 });

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to safely access files[0]
    if (file) {
      if (file.type !== "text/plain") {
        toast.error("Only .txt files are allowed");
        return;
      }
      if (file.size > 1024 * 1024) {
        toast.error("File size should be less than 1MB");
        return;
      }
      setSelectedFile(file);
      setFileDetails({ name: file.name, size: file.size });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileDetails({ name: "", size: 0 });

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch(endPoints, {
        body: formData,
        method: "POST",
      }).then((res) => res.json());
      if (!response?.success)
        return toast.error(response?.message ?? "Something went wrong");
      setRawData(response?.data);
      return toast.success(response?.message);
    } catch (error) {
      return toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <RainbowHeading text={removeDashFromString(heading)} />
      <div className="mt-10">
        <div className="relative  cursor-pointer h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
          <div className="absolute  cursor-pointer">
            <div className="flex flex-col items-center cursor-pointer">
              <i className="fa fa-folder-open fa-4x text-blue-700"></i>
              <span className="block text-gray-400 font-normal cursor-pointer">
                Attach you files here
              </span>
            </div>
          </div>

          <input
            type="file"
            onChange={handleFileChange}
            disabled={isLoading}
            ref={fileInputRef}
            className="h-full w-full cursor-pointer opacity-0"
            name=""
          />
        </div>
        {selectedFile && (
          <div className="mt-4 border-2 w-fit px-4 py-2 rounded-lg border-dashed relative">
            <IoCloseOutline
              onClick={handleRemoveFile}
              className="text-xl border-2 rounded-full absolute -top-2 -right-2 bg-white hover:rotate-180 transition-all duration-300 cursor-pointer"
            />
            <p>
              <span className="font-bold">File Name:</span> {fileDetails.name}
            </p>
            <p>
              <span className="font-bold">File Size:</span>{" "}
              {(fileDetails.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>
      <div className="ms-auto my-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-3 flex flex-row justify-center items-center gap-2 text-lg font-bold border-2 rounded-lg px-3 py-1 hover:text-white hover:border-transparent hover:bg-black transition-colors duration-300"
        >
          {isLoading ? <CgSpinnerTwo className="animate-spin" /> : ""}{" "}
          {buttonText}
        </button>
      </div>
      <div className="w-full min-h-96 break-words border-2 border-dashed rounded-lg shadow-lg text-wrap overflow-auto">
        {rawData ? (
          <pre className="w-full min-h-96 break-words whitespace-pre-wrap">
            {formatData(rawData, showingFormat)}
          </pre>
        ) : (
          <h1 className="text-3xl font-bold text-center">
            No content available
          </h1>
        )}
      </div>
    </div>
  );
};

export default InputFileClientComponent;
