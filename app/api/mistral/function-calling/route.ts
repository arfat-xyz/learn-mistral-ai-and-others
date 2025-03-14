import { formatResponse, routeErrorHandler } from "@/lib/api-response";
import { mistralTools } from "@/lib/mistral-tools";
import { inputSchema } from "@/lib/zod-validation";
import { mistralChatModelName, mistralClient } from "@/utils/mistral";

/**
 * Handles a POST request.
 * @param request - The incoming request object.
 * @returns A formatted response or error.
 */
export async function POST(request: Request) {
  try {
    // Step 1: Parse and validate the request body
    // Expecting the input text from the user that will be used for the AI query
    const body = await request.json();
    const { inputText } = inputSchema.parse(body); // Validate the input using the schema

    const response = await mistralClient.chat.complete({
      model: mistralChatModelName, // The specific model to use for chat responses
      // Check if there is a system message. If not, add a default system message
      messages: [
        {
          role: "system", // System role is used to define the behavior of the assistant
          content:
            "You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.",
        },
        {
          role: "user",
          content: inputText,
        },
      ],
      tools: mistralTools,
      temperature: 0.7, // Pass the temperature to control the randomness
      responseFormat: {
        type: "text", // Define the response format as plain text
      },
    });
    return formatResponse(response, "Data fetched successfully");
  } catch (error) {
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
