"use client";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * Custom hook to handle streaming responses from an API.
 * @param api - The API endpoint to stream responses from.
 * @returns An object containing the streamed responses, loading state, and a function to start the stream.
 */
function useStreamResponseHook(api: string) {
  const [responses, setResponses] = useState(""); // State to store the streamed responses
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  /**
   * Function to start streaming responses from the API.
   * @param inputText - The input text to send to the API.
   */
  const startStream = async (inputText: string) => {
    try {
      setIsLoading(true); // Set loading to true when the stream starts
      setResponses(""); // Reset responses before starting a new stream

      // Make a POST request to the API with the input text
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({ inputText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response body is readable (streamable)
      if (!response.body) {
        toast.error("Readable is not Supported");
        throw new Error("Readable is not Supported");
      }

      const reader = response.body.getReader(); // Get a reader to read the stream

      /**
       * Recursive function to read chunks of data from the stream.
       */
      const read = async () => {
        const { done, value } = await reader.read(); // Read the next chunk
        if (done) {
          setIsLoading(false); // If the stream is done, set loading to false
          return;
        }

        // Decode the chunk of data and update the responses state
        const text = new TextDecoder("utf-8").decode(value);
        if (!text.includes("END_STREAM")) {
          setResponses((prev) => prev + text); // Append the new chunk to the existing responses
        }

        read(); // Continue reading the next chunk
      };

      read(); // Start reading the stream
    } catch (error) {
      console.log("Error from useStreamResponse hook", { error });
      toast.error("An error occurred while streaming the response.");
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  return { responses, isLoading, startStream }; // Return the states and function for external use
}

export default useStreamResponseHook;
