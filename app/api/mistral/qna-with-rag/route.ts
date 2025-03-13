import { NextResponse } from "next/server";
import { routeErrorHandler } from "@/lib/api-response"; // Custom error handler for standardizing error responses
import { inputSchema } from "@/lib/zod-validation"; // Zod schema for validating input
import { mistralChatStreamResponse } from "@/utils/mistal"; // Utility function to interact with Mistral AI chat
import {
  iteratorToStream,
  makeIterator,
} from "@/utils/stream-iterator-and-iterator-stream"; // Utilities for converting iterators to streams
import { mistralVectorStore } from "@/utils/mistral-supabase"; // Utility for querying the vector store in Supabase

/**
 * Handles POST requests to the API route.
 * This function processes the input, searches a vector store for relevant content,
 * and streams the response from the Mistral AI model based on that content.
 *
 * @param request - The incoming HTTP request.
 * @returns A streaming response with the AI-generated content.
 */
export async function POST(request: Request) {
  try {
    // Step 1: Parse and validate the request body
    // Expecting the input text from the user that will be used for the AI query
    const body = await request.json();
    const { inputText } = inputSchema.parse(body); // Validate the input using the schema

    /**
     * Step 2: Search the input text in the vector store (Supabase) for relevant context.
     * The goal here is to retrieve documents that are similar to the user's input.
     * We perform a similarity search to find the top 3 most relevant documents and combine them into one content block.
     */
    const supabaseContent = await mistralVectorStore
      .similaritySearch(inputText, 3) // Query the vector store with the input text
      .then((docs) => docs.map((d) => d.pageContent).join(`\n\n`)); // Join the relevant content into one string

    // Step 3: Build a request to the Mistral AI model
    // We're passing the combined context (from Supabase) along with the user's question to the AI model
    const chatResponse = await mistralChatStreamResponse([
      {
        role: "system", // The system message sets the behavior of the AI
        content: `You're a helpful ai assistant name handbook assistant.
           You can only answer {Question} based on {Handbook context} only.
            If the answer is not available in context, simply reply with:
            'Sorry!! I don't know the answer.' You can also answer greetings too.`,
      },
      {
        role: "user", // The user message contains the actual input question along with the context
        content: `Handbook context: ${supabaseContent} - Question: ${inputText}`,
      },
    ]);

    // Step 4: Convert the chat response iterator into a stream
    // Mistral returns the response in the form of an iterator. This utility function will convert the iterator into a readable stream
    const stream = iteratorToStream(makeIterator(chatResponse));

    // Step 5: Return the stream as a response with a plain text content type
    // The response is streamed to the client as plain text, so it can be processed in real-time
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain", // Indicating that the response is plain text
      },
    });
  } catch (error) {
    // Step 6: Handle errors if anything goes wrong during the process
    // If an error occurs, it is logged and passed to a custom error handler to return a standardized error response
    console.log("Error", { error });
    return routeErrorHandler(error); // Custom error handler
  }
}
