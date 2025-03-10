import {
  formatErrorResponse,
  formatResponse,
  routeErrorHandler,
} from "@/lib/api-response";
import { fileSchema } from "@/lib/zod-validation"; // Import your Zod file schema
import {
  loadFileAndReturnLangDocuments,
  recursiveCharacterTextSplitter,
} from "@/utils/langchain";

/**
 *
 * @param request
 * @returns
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
    const pageConent = output.map((chunk) => chunk.pageContent).join(`\n\n`);
    return formatResponse(pageConent, "Data fetched successfully");
  } catch (error) {
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
