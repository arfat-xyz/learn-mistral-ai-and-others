import { EventStream } from "@mistralai/mistralai/lib/event-streams";
import { CompletionEvent } from "@mistralai/mistralai/models/components";

/**
 * Converts the Mistral AI chat response into an async iterator.
 * This function encodes each chunk of the response into a Uint8Array.
 * @param chatResponse - The streaming response from Mistral AI.
 */
export async function* makeIterator(
  chatResponse: EventStream<CompletionEvent>
) {
  const encoder = new TextEncoder(); // Encodes strings into Uint8Array

  // Iterate over each chunk in the chat response
  for await (const chunk of chatResponse) {
    const newChunk = chunk?.data.choices[0].delta.content as string; // Extract content
    yield encoder.encode(newChunk); // Yield encoded content
  }

  // Signal the end of the stream
  yield encoder.encode("END_STREAM");
}

/**
 * Converts an async iterator into a ReadableStream.
 * This allows the iterator to be used in a streaming HTTP response.
 * @param iterator - The async iterator to convert.
 * @returns A ReadableStream that can be used in a response.
 */
export function iteratorToStream(iterator: AsyncGenerator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      // Get the next value from the iterator
      const { value, done } = await iterator.next();

      if (done) {
        // Close the stream if the iterator is done
        controller.close();
      } else {
        // Enqueue the next chunk of data
        controller.enqueue(value);
      }
    },
  });
}
