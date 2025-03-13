export type RawData = string | object | number | boolean | null | undefined;

export interface MistralMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface MistralChatResponse {
  response: string;
}

export type ShowFormat = "JSON" | "text" | "markdown";
