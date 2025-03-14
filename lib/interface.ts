export type RawData = string | object | number | boolean | null | undefined;

export interface MistralMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string; // Optional name field
  toolCallId?: string; // Optional name field
}

export interface MistralChatResponse {
  response: string;
}

export type ShowFormat = "JSON" | "text" | "markdown";
