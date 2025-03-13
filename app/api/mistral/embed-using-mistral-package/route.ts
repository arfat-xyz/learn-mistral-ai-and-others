import {
  formatErrorResponse,
  formatResponse,
  routeErrorHandler,
} from "@/lib/api-response";
import { fileSchema } from "@/lib/zod-validation";
import {
  loadFileAndReturnLangDocuments,
  recursiveCharacterTextSplitter,
} from "@/utils/langchain";
import { createMistralEmbeddingUsingDocumentsAndString } from "@/utils/mistal";

/**
 * Handles a POST request.
 * @param request - The incoming request object.
 * @returns A formatted response or error.
 */
export async function POST(request: Request) {
  try {
    // Parse the FormData from the request
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    // Check if file exists
    if (!file) {
      return formatErrorResponse("No file uploaded", 404);
    }

    // Validate the file using Zod
    const validation = fileSchema.safeParse(file);
    if (!validation.success) {
      // If validation fails, return the first error message
      return formatErrorResponse(validation.error.errors[0].message, 422);
    }
    const text = await loadFileAndReturnLangDocuments(file);
    const output = await recursiveCharacterTextSplitter.splitDocuments(text);
    const mistralEmbeddings =
      await createMistralEmbeddingUsingDocumentsAndString(output);
    return formatResponse(mistralEmbeddings, "Data fetched successfully");
  } catch (error) {
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
