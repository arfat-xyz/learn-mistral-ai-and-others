import { formatResponse, routeErrorHandler } from "@/lib/api-response";
import { MistralMessage } from "@/lib/interface";
import {
  getPaymentDate,
  getPaymentStatus,
  mistralTools,
} from "@/lib/mistral-tools";
import { inputSchema } from "@/lib/zod-validation";
import { mistralChatModelName, mistralClient } from "@/utils/mistral";

// Available functions for tool calls
const availableFunctions = {
  getPaymentDate,
  getPaymentStatus,
} as const; // Using `as const` to make function names literal types

// Helper function to create a delay (for waiting before next operation)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Handles POST requests to interact with the Mistral AI model.
 * @param request - The incoming request object containing user input.
 * @returns Formatted response or error message.
 */
export async function POST(request: Request) {
  try {
    // Step 1: Parse and validate input text from the user request
    const body = await request.json();
    const { inputText } = inputSchema.parse(body); // Validates input using Zod schema

    // Step 2: Prepare initial messages with system behavior and user input
    const messages: MistralMessage[] = [
      {
        role: "system", // Defines the assistant's role and behavior
        content: "You are a friendly assistant",
      },
      {
        role: "user", // User input message
        content: inputText,
      },
    ];

    // Step 3: Send messages to the Mistral chat model for a response
    const response = await mistralClient.chat.complete({
      model: mistralChatModelName, // AI model to generate the response
      messages,
      toolChoice: "any", // Allow any tool to be chosen
      tools: mistralTools, // Available tools for the assistant
      temperature: 0.7, // Controls the randomness of responses
      responseFormat: {
        type: "text", // Plain text response format
      },
    });

    // Step 4: Check if the assistant provided a valid response
    if (
      response?.choices &&
      response.choices[0]?.message?.role === "assistant"
    ) {
      // Add assistant's response to the messages
      messages.push(response.choices[0]?.message as MistralMessage);

      // Step 5: Handle completion based on the assistant's finish reason
      if (response?.choices[0].finishReason === "stop") {
        // If the assistant finishes the task, return the response
        return formatResponse(
          {
            finalAnswer: response?.choices[0].message.content,
            ...response,
          },
          "Data fetched successfully"
        );
      } else if (
        response?.choices &&
        response.choices[0]?.finishReason === "tool_calls"
      ) {
        // Handle tool calls if the assistant requires additional functions
        const toolCalls = response.choices[0]?.message?.toolCalls;
        if (toolCalls && toolCalls.length > 0) {
          // Extract the function name and arguments from tool calls
          const functionName = toolCalls[0]?.function
            ?.name as keyof typeof availableFunctions; // Ensures it's a valid function
          const functionArgs = JSON.parse(
            toolCalls[0]?.function?.arguments as string
          );

          // Call the relevant function with arguments
          const functionResponse =
            availableFunctions[functionName](functionArgs);

          // Add tool response to messages
          messages.push({
            role: "tool",
            name: functionName,
            content: functionResponse,
            toolCallId: toolCalls[0].id,
          });

          // Wait for a short delay before continuing
          await delay(3000);

          // Step 6: Send the updated messages back to the Mistral model
          const functionREs = await mistralClient.chat.complete({
            model: mistralChatModelName,
            messages,
          });

          // Return the response after the tool function execution
          return formatResponse(functionREs, "Data fetched successfully");
        }

        // Default response if no special conditions were met
        return formatResponse(response, "Data fetched successfully");
      }
    }
  } catch (error) {
    // Log and return an error response if any step fails
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
