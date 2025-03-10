import { z } from "zod";

/**
 * Schema for validating text input.
 * This ensures that the input is a non-empty string.
 */
export const inputSchema = z.object({
  inputText: z
    .string({
      invalid_type_error: "Input text must be a string", // Error message if the input is not a string
      required_error: "Input text is required", // Error message if the input is missing
    })
    .min(1, { message: "Input text cannot be empty" }), // Ensures the string is not empty
});

/**
 * Custom validation function to check if a file's size is within the allowed limit.
 * @param file - The file to validate.
 * @param maxSizeInMB - The maximum allowed file size in megabytes (MB).
 * @returns `true` if the file size is within the limit, otherwise `false`.
 */
const validateFileSize = (file: File, maxSizeInMB: number) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
  return file.size <= maxSizeInBytes; // Check if the file size is within the limit
};

/**
 * Custom validation function to check if a file's type is allowed.
 * @param file - The file to validate.
 * @param allowedTypes - An array of allowed MIME types (e.g., ["text/plain", "application/pdf"]).
 * @returns `true` if the file type is allowed, otherwise `false`.
 */
const validateFileType = (file: File, allowedTypes: string[]) => {
  return allowedTypes.includes(file.type); // Check if the file type is in the allowed list
};

/**
 * Zod schema for validating files.
 * This ensures that the input is a valid file, within the allowed size, and of the correct type.
 */
export const fileSchema = z
  .custom<File>(
    (val) => val instanceof File, // Ensure the input is a File object
    {
      message: "Expected a file", // Error message if the input is not a file
    }
  )
  .refine(
    (file) => validateFileSize(file, 2), // Validate file size (max 2MB)
    { message: "File size must be less than 2MB" } // Error message if the file is too large
  )
  .refine(
    (file) => validateFileType(file, ["text/plain"]), // Validate file type (only plain text files allowed)
    { message: "File must be a text file (txt)" } // Error message if the file type is invalid
  );
