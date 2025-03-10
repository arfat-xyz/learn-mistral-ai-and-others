"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import RainbowHeading from "./rainbow-heading";
import { CgSpinnerTwo } from "react-icons/cg";
import { removeDashFromString } from "@/lib/utils-function";
import useStreamResponseHook from "@/hooks/useStreamResponseHook";

const InputSubmitStreamComponent = ({
  defaultInput = "",
  endPoints = "",
  heading = "Learn Langchain",
  buttonValue = "Submit",
}: {
  endPoints?: string;
  defaultInput?: string;
  heading?: string;
  buttonValue?: string;
}) => {
  const [inputText, setInputText] = useState(defaultInput);
  const { isLoading, responses, startStream } =
    useStreamResponseHook(endPoints);
  const handleSubmit = async () => {
    if (!inputText) return toast.error("Input text is requried");
    startStream(inputText);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <RainbowHeading text={removeDashFromString(heading)} />
      <div className=" mt-10">
        <textarea
          name="text"
          id=""
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          cols={30}
          rows={10}
          className="border-2 rounded-lg w-full p-2 h-20"
          placeholder="Insert text"
        />
      </div>
      <div className="ms-auto my-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-3 flex flex-row justify-center items-center gap-2 text-lg font-bold border-2 rounded-lg px-3 py-1 hover:text-white hover:border-transparent hover:bg-black transition-colors duration-300"
        >
          {isLoading ? <CgSpinnerTwo className="animate-spin" /> : ""}{" "}
          {buttonValue}
        </button>
      </div>
      <div className="w-full min-h-96 break-words border-2 border-dashed rounded-lg shadow-lg text-wrap overflow-auto">
        {responses ? (
          <pre className="w-full min-h-96 break-words whitespace-pre-wrap">
            {JSON.stringify(responses, null, 2)}
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

export default InputSubmitStreamComponent;
