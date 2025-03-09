import { NextResponse } from "next/server"; // Importing NextResponse for structured responses
import { ZodError } from "zod";

// Define a generic type for the API response structure
type ApiResponse<T> = {
  success: boolean; // Indicates if the request was successful
  message: string; // Provides a message about the response
  data?: T; // Optional data payload of generic type T
};

/**
 * formatResponse
 * A utility function to standardize successful responses.
 *
 * @param {T} data - The data to include in the response
 * @param {string} [message="Operation completed successfully"] - Optional success message
 * @param {number} [status=200] - HTTP status code (default: 200)
 * @returns {NextResponse} - A formatted JSON response with a success flag, message, and data
 */
export function formatResponse<T>(
  data: T,
  message = "Operation completed successfully",
  status = 200
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true, // Indicates a successful response
      message, // Success message
      data, // Response data payload
    },
    { status }
  );
}

/**
 * formatErrorResponse
 * A utility function to standardize error responses.
 *
 * @param {string} [message="An error occurred"] - Optional error message
 * @param {number} [status=500] - HTTP status code (default: 500)
 * @returns {NextResponse} - A formatted JSON response with an error flag, message, and null data
 */
export function formatErrorResponse(
  message = "An error occurred",
  status = 500,
  success = false
) {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: success, // Indicates an error response
      message, // Error message
      data: null, // No data is provided in case of error
    },
    { status }
  );
}

export class HTTPError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * routeErrorHandler
 * Handles various error types, including validation errors, generic errors, and unknown errors.
 *
 * @param {unknown} error - The error object to handle
 * @returns {Response} - A formatted error response based on the type of error
 */
export function routeErrorHandler(error: unknown) {
  // if (error instanceof RequiresHigherPlanError) {
  //   return formatErrorResponse("Requires Higher Plan", 402);
  // }

  if (error instanceof ZodError) {
    // Handle Zod validation errors
    const validationErrors = error.errors.map((err) => err.message).join(", ");
    return formatErrorResponse(validationErrors, 422);
  }

  // if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //   // Handle known Prisma errors (e.g., unique constraint, record not found)
  //   switch (error.code) {
  //     case "P2002":
  //       const conflictFields = Array.isArray(error.meta?.target)
  //         ? `on fields: (${error.meta.target.join(", ")})`
  //         : "on unique constraint.";
  //       return formatErrorResponse(
  //         `Unique constraint failed ${conflictFields}`,
  //         409
  //       );
  //     case "P2025":
  //       return formatErrorResponse("Record not found.", 404);
  //     default:
  //       return formatErrorResponse("A database error occurred.", 500);
  //   }
  // }

  if (error instanceof HTTPError) {
    return formatErrorResponse(error.message, error.statusCode);
  }

  if (error instanceof Error) {
    // Handle generic errors
    return formatErrorResponse(error.message, 500);
  }

  // Handle unknown error types
  return formatErrorResponse(
    "Internal server error. Please try again later.",
    500
  );
}
