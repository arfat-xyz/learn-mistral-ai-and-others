import { z } from "zod";

export const inputSchema = z.object({
  inputText: z
    .string({
      invalid_type_error: "input text must be a string",
      required_error: "Input text is required",
    })
    .min(1, { message: "Name cannot be empty" }),
});
