// Importing necessary modules and functions
import { formatResponse, routeErrorHandler } from "@/lib/api-response"; // Functions to format response and handle errors
import { inputSchema } from "@/lib/zod-validation"; // Zod schema to validate incoming request data
import { mistralChatCompleteResponse, mistralClient } from "@/utils/mistal"; // Mistral client for interacting with Mistral API

// POST request handler function
export async function POST(request: Request) {
  try {
    // Parse the JSON request body
    const body = await request.json();
    // Validate and extract inputText from the request body using Zod schema
    const { inputText: content } = inputSchema.parse(body);

    // Making an API call to Mistral's chat model for generating a response
    const chatResponse = await mistralChatCompleteResponse([
      {
        role: "system", // System-level message providing context for the assistant's behavior
        content:
          "You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.",
      },
      { role: "user", content }, // User's message containing the input text
    ]);

    // Returning a formatted response with the chat response or a default message if no response is found
    return formatResponse(
      {
        answer: chatResponse?.choices
          ? chatResponse?.choices[0]?.message.content
          : "No answer", // Extracting the answer from the response or providing a fallback
        ...chatResponse, // Including the full chat response
      },
      "Success" // Status message
    );
  } catch (error) {
    // If an error occurs, log it and return an error response using routeErrorHandler
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
