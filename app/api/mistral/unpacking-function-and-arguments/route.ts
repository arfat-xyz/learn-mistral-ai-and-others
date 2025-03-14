import { formatResponse, routeErrorHandler } from "@/lib/api-response";
import { MistralMessage } from "@/lib/interface";
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
    const messages: MistralMessage[] = [
      {
        role: "system", // System role is used to define the behavior of the assistant
        content:
          "You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.",
      },
      {
        role: "user",
        content: inputText,
      },
    ];
    const response = await mistralClient.chat.complete({
      model: mistralChatModelName, // The specific model to use for chat responses
      // Check if there is a system message. If not, add a default system message
      messages,
      tools: mistralTools,
      temperature: 0.7, // Pass the temperature to control the randomness
      responseFormat: {
        type: "text", // Define the response format as plain text
      },
    });

    if (
      response?.choices &&
      response.choices[0]?.message?.role === "assistant"
    ) {
      const message: MistralMessage = {
        role: response.choices[0].message.role || "assistant", // default to "assistant" if undefined
        content: Array.isArray(response.choices[0].message?.content)
          ? response.choices[0].message.content.join(" ")
          : response.choices[0].message?.content || "",
      };
      messages.push(message);

      if (
        response?.choices &&
        response.choices[0]?.finishReason === "tool_calls"
      ) {
        const toolCalls = response.choices[0]?.message?.toolCalls;
        if (toolCalls && toolCalls.length > 0) {
          const functionName = toolCalls[0]?.function?.name;
          const functionArgs = JSON.parse(
            toolCalls[0]?.function?.arguments as string
          );
          return formatResponse(
            { functionArgs, functionName, ...response },
            "Data fetched successfully"
          );
          // You can now safely use functionName and functionArgs
        }
      }
    }

    return formatResponse(response, "Data fetched successfully");
  } catch (error) {
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
