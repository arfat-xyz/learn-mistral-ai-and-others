import { Mistral } from "@mistralai/mistralai"; // Import the Mistral client library
import { Document } from "langchain/document"; // Import the Document type from LangChain

// Retrieve the Mistral API key from environment variables
const apiKey = process.env.MISTRAL_API_KEY;

// Initialize the Mistral client with the API key
export const mistralClient = new Mistral({ apiKey: apiKey });

/**
 * Function to create embeddings for text chunks using Mistral's embedding model.
 * Embeddings are numerical representations of text that capture semantic meaning.
 *
 * @param chunks - An array of `Document` objects, where each document contains text content.
 * @returns A promise that resolves to the embeddings generated by Mistral's API.
 */
export const createMistralEmbedding = async (chunks: Document[]) =>
  mistralClient.embeddings.create({
    model: "mistral-embed", // Specify the Mistral embedding model to use
    inputs: chunks.map((chunk) => chunk.pageContent), // Extract the text content from each document
  });
