import { NextResponse } from "next/server";
import { routeErrorHandler } from "@/lib/api-response";
import { inputSchema } from "@/lib/zod-validation";
import { mistralChatStreamResponse, mistralClient } from "@/utils/mistal";
import {
  iteratorToStream,
  makeIterator,
} from "@/utils/stream-iterator-and-iterator-stream";

/**
 * Handles POST requests to the API route.
 * This function streams responses from the Mistral AI model.
 * @param request - The incoming HTTP request.
 * @returns A streaming response with the AI-generated content.
 */
export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { inputText: content } = inputSchema.parse(body);

    // Stream a chat response from the Mistral AI model
    const chatResponse = await mistralChatStreamResponse([
      { role: "user", content }, // User's input
    ]);

    // Convert the chat response iterator into a stream
    const stream = iteratorToStream(makeIterator(chatResponse));

    // Return the stream as a response with plain text content type
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    // Handle errors and return a standardized error response
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
