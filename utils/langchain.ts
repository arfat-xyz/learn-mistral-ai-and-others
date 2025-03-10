import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { TextLoader } from "langchain/document_loaders/fs/text";

/**
 * RecursiveCharacterTextSplitter is a utility for splitting large text documents
 * into smaller chunks. This is useful for processing large texts in manageable pieces,
 * especially when working with language models or other text-processing tools.
 *
 * Configuration:
 * - `chunkOverlap: 100`: Ensures that adjacent chunks overlap by 100 characters.
 *   This helps maintain context between chunks.
 * - `chunkSize: 500`: Specifies the maximum size of each chunk (in characters).
 * - `separators: ["\n\n", "\n", " ", ""]`: Defines the sequence of separators used to split the text.
 *   It tries to split by paragraphs (`\n\n`), then by lines (`\n`), then by spaces, and finally by characters.
 */
export const recursiveCharacterTextSplitter =
  new RecursiveCharacterTextSplitter({
    chunkOverlap: 100,
    chunkSize: 500,
    separators: ["\n\n", "\n", " ", ""],
  });

/**
 * Loads a file and converts it into LangChain document objects.
 * This function is useful for preparing text data for processing with LangChain tools.
 *
 * @param file - The file to be loaded. This should be a `File` object (e.g., from a file input or FormData).
 * @returns A promise that resolves to an array of LangChain document objects.
 *          Each document represents a part of the file's content.
 *
 * How it works:
 * 1. `TextLoader` is initialized with the file.
 * 2. The `load()` method reads the file's content and converts it into LangChain documents.
 * 3. These documents can then be processed further (e.g., split into chunks using `recursiveCharacterTextSplitter`).
 */
export const loadFileAndReturnLangDocuments = (file: File) => {
  const result = new TextLoader(file); // Initialize the TextLoader with the file
  return result.load(); // Load the file and return LangChain documents
};
