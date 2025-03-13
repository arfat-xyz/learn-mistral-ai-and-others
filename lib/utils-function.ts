import { RawData, ShowFormat } from "./interface";

export const removeDashFromString = (text: string) => text.replace(/-/g, " ");

/**
 * Formats raw data based on the specified format.
 * @param rawData - The raw data to format.
 * @param format - The format to apply (e.g., "JSON", "text", "markdown").
 * @returns The formatted data as a string.
 */
export const formatData = (rawData: RawData, format: ShowFormat): string => {
  switch (format) {
    case "JSON":
      return JSON.stringify(rawData, null, 2); // Pretty-print JSON
    case "text":
      return rawData?.toString() || ""; // Safely convert to plain text
    case "markdown":
      return typeof rawData === "string" ? rawData : JSON.stringify(rawData); // Handle markdown
    default:
      return rawData?.toString() || ""; // Fallback to plain text
  }
};
