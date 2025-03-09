"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const DashboardClientComponent = () => {
  const [rawData, setRawData] = useState();

  return (
    <div className="">
      <div className="flex flex-wrap w-full h-full gap-4 mb-8">
        {/* <button
          onClick={handleTestingPrompt}
          className="mt-3 text-lg font-bold border-2 rounded-lg px-3 py-1 hover:text-white hover:border-transparent hover:bg-black transition-colors duration-300"
        >
          Test Prompt Templates
        </button> */}
      </div>

      <div className="w-full min-h-96 border-2 border-dashed rounded-lg shadow-lg text-wrap overflow-auto">
        {rawData ? (
          <pre>{JSON.stringify(rawData, null, 2)}</pre>
        ) : (
          <h1 className="text-3xl font-bold text-center">
            No content available
          </h1>
        )}
      </div>
    </div>
  );
};

export default DashboardClientComponent;
