Mistral AI is a French startup specializing in open-source large language models (LLMs). Founded in April 2023 by former researchers from Google DeepMind and Meta AI, the company focuses on creating open, portable, customizable, and cost-effective models that require fewer computational resources than other popular LLMs.

Mistral AI offers a range of models, including:

1. **Mistral Large**: A top-tier reasoning model designed for high-complexity tasks, released in November 2024.
2. **Pixtral Large**: A frontier-class multimodal model released in November 2024.
3. **Mistral Saba**: A 24B parameter model trained on meticulously curated datasets from the Middle East and South Asia, released in February 2025.
4. **Mistral 7B**: A model that outperforms LLaMA 2 13B on all benchmarks tested, despite having only 7 billion parameters.
5. **Codestral 22B**: A model that surpasses Meta's Llama3 70B and DeepSeek Coder 33B in programming-related tasks.

Mistral AI also provides agent models that can execute complex tasks based on high-level instructions. These agents can plan, use tools, carry out steps of processing, and take actions to achieve specific goals.

Mistral AI's models are known for their advanced reasoning capabilities. For example, the Mistral-Small-24B-Base-2501 model demonstrates remarkable abilities in complex reasoning tasks that were once considered exclusive to much larger models.

Mistral AI's pricing strategy is competitive, with models like Mistral-Tiny, Small, and Medium priced significantly lower than OpenAI's offerings. For instance, Mistral-Medium's API costs are almost four times less than GPT-4 but more expensive than GPT-3.5 Turbo. The Mistral Large model is priced at $8 per million input tokens and $24 per million output tokens, making it 20% cheaper than GPT-4 Turbo.

Le Chat, Mistral AI's comprehensive AI assistant, offers a Pro subscription tier priced at $14.99 per month. This tier provides access to more advanced models, unlimited messaging, and web browsing. There are also discounts available for students, with the price as little as $6.99 per month. For teams, there’s a plan at $24.99 per month, and enterprise solutions are available with custom pricing.

# Important links

- https://docs.mistral.ai/getting-started/quickstart/ ⇒ Docs
- https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1 ⇒ Mistral in hugginface
- https://docs.mistral.ai/api/#tag/chat/operation/chat_completion_v1_chat_completions_post ⇒ Chat completion
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-mistral-chat-completion.html ⇒ Chat completion
- https://mistral.ai/en/products/la-plateforme#models ⇒ latest models
- https://mistral.ai/en/news/mixtral-of-experts ⇒ choose model as you required
- https://docs.mistral.ai/capabilities/embeddings/ ⇒ Embeddings

# Get API key

- https://auth.mistral.ai/ui/login ⇒ Sign in
- Create `workspace` if you’re new user
- Get `Experimental` Subscription
- https://console.mistral.ai/api-keys ⇒ Get API keys from here

### Mistral API limits

- 1 request per second
- 500,000 tokens per minute
- 1 billion tokens per month

# Mistral Basic Chat Complete

```tsx
// Importing necessary modules and functions
import { formatResponse, routeErrorHandler } from "@/lib/api-response"; // Functions to format response and handle errors
import { inputSchema } from "@/lib/zod-validation"; // Zod schema to validate incoming request data
import { mistralClient } from "@/utils/mistal"; // Mistral client for interacting with Mistral API

// POST request handler function
export async function POST(request: Request) {
  try {
    // Parse the JSON request body
    const body = await request.json();
    // Validate and extract inputText from the request body using Zod schema
    const { inputText: content } = inputSchema.parse(body);

    // Making an API call to Mistral's chat model for generating a response
    const chatResponse = await mistralClient.chat.complete({
      model: "mistral-large-latest", // The model to use for the chat, in this case, the latest large Mistral model
      messages: [
        {
          role: "system", // System-level message providing context for the assistant's behavior
          content:
            "You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.",
        },
        { role: "user", content }, // User's message containing the input text
      ],
      temperature: 0.7, // Controls the randomness of the response. Lower values make it more deterministic.
      responseFormat: {
        type: "json_object", // Specifies that the response format should be a JSON object
      },
    });

    // Returning a formatted response with the chat response or a default message if no response is found
    return formatResponse(
      {
        answer: chatResponse?.choices
          ? chatResponse?.choices[0]?.message.content
          : "No answer", // Extracting the answer from the response or providing a fallback
        ...chatResponse, // Including the full chat response
      },
      "Success" // Status message
    );
  } catch (error) {
    // If an error occurs, log it and return an error response using routeErrorHandler
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
```

### Explanation:

1. **`chat.complete`**:
   - This is the function used to make a request to the Mistral model's API and generate a response based on the provided inputs. It simulates a conversation with the model.
   - The `complete` method takes several parameters:
     - **`model`**: Specifies which version of the model should be used to process the request. In this case, `"mistral-large-latest"` indicates the latest version of the large model.
     - **`messages`**: An array of messages in the conversation. The system message provides the initial context and sets the behavior of the assistant, while the user message contains the input text that needs a response.
     - **`temperature`**: Controls how deterministic (predictable) or random the model's responses will be. A lower value (e.g., 0.2) will make the response more focused and deterministic, while a higher value (e.g., 0.8) will introduce more randomness. Here, `0.7` is a good balance between randomness and consistency.
     - **`responseFormat`**: This specifies the format in which the response should be returned. In this case, `json_object` means the response will be structured as a JSON object.
2. **`responseFormat`**:
   - The `responseFormat` specifies the expected structure of the response from the API.
   - In the code above, it's set to `json_object`, meaning the Mistral API will return a JSON object containing the result of the chat, which is easy to process and use in the application.
   - Other possible formats might include plain text or different structured formats, depending on the API’s capabilities.
3. **`Message`**:

   - A message is an object in the `messages` array that represents a part of the conversation between the system and the user. Each message has:
     - **`role`**: Defines whether the message is from the "system" (providing context), the "user" (input text), or the "assistant" (model-generated response).
     - **`content`**: The actual text or content of the message. For example, the system message might have context like, "You are a helpful assistant," and the user message contains the actual query or request.

   Example:

   ```tsx
   { role: "system", content: "You are a friendly cheese connoisseur..." }

   ```

4. **`temperature`**:
   - This parameter controls the level of creativity or randomness in the model's response.
   - The higher the temperature (e.g., 1.0), the more random and varied the output will be.
   - The lower the temperature (e.g., 0.2), the more deterministic and predictable the output will be.
   - In the code, `temperature: 0.7` strikes a good balance between random creativity and consistent, sensible responses.
5. **`model`**:
   - This specifies the particular Mistral model to use. `"mistral-large-latest"` refers to the most recent, larger version of the model, which is typically more capable in terms of handling complex queries and generating more nuanced responses.

### Example Response from Mistral API:

The Mistral API would return a response object that might look like this:

```json
{
  "choices": [
    {
      "message": {
        "content": "Cheese is life! A sharp cheddar pairs well with a bold wine, but a smooth brie will melt your heart."
      }
    }
  ]
}
```

# Embed and store into vector store

- For mistral we need `1024` vector dimension to store it

### Create vector store and collect api keys

After sign in, got to a porject ⇒ settings ⇒ data api to collect credentials(URL, anon public)

Into vector store, Go to `SQL editor` then run bellow to code to create embedding table and search function

```
-- Enable the pgvector extension to work with embedding vectors
create schema if not exists extensions;

-- Create a table to store your documents
create table documents_scrimba_mistral_langchain (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1024) -- 1024 works for Mistral embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents_scrimba_mistral_langchain (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents_scrimba_mistral_langchain.embedding <=> query_embedding) as similarity
  from documents_scrimba_mistral_langchain
  where metadata @> filter
  order by documents_scrimba_mistral_langchain.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

### Install packages and initiate it

```tsx
// Install packages
npm i @langchain/core @langchain/mistralai langchain/document_loaders @langchain/textsplitters @supabase/supabase-js @langchain/community
```

**Create all instance**

```tsx
// Import necessary modules
import { createClient } from "@supabase/supabase-js"; // For interacting with Supabase database
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"; // To store and retrieve document embeddings in Supabase
import { MistralAIEmbeddings } from "@langchain/mistralai"; // To generate embeddings using the Mistral AI model

// Supabase authentication: fetching API key and URL from environment variables
const sbApiKey = process.env.SUPABASE_API_KEY as string; // API key for accessing Supabase
const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT as string; // URL to connect to the Supabase project
export const supabaseClient = createClient(sbUrl, sbApiKey); // Create a Supabase client instance

// Creating an instance of MistralAIEmbeddings to generate embeddings
export const minstralEmbedingsInstance = new MistralAIEmbeddings({
  model: "mistral-embed", // Model used to generate embeddings (default value for Mistral AI embeddings)
});

// Setting up the SupabaseVectorStore for saving document embeddings in Supabase
export const mistralVectorStore = new SupabaseVectorStore(
  minstralEmbedingsInstance, // Pass the Mistral embeddings instance to generate and store embeddings
  {
    client: supabaseClient, // Supabase client to interact with the database
    tableName: "documents_scrimba_mistral_langchain", // Table in Supabase where document embeddings will be stored
    queryName: "match_documents_scrimba_mistral_langchain", // Custom query to retrieve and match document embeddings
  }
);
```

### Create embeddings and store into vector store

```tsx
/**
 * Import necessary modules from LangChain
 */
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"; // To split the document into chunks
import { TextLoader } from "langchain/document_loaders/fs/text"; // To load text files into LangChain format

/**
 * RecursiveCharacterTextSplitter configuration
 * This will split the text into smaller chunks with a maximum size of 500 characters
 * and 100 characters of overlap between chunks.
 */
export const recursiveCharacterTextSplitter =
  new RecursiveCharacterTextSplitter({
    chunkOverlap: 100, // The number of characters to overlap between chunks
    chunkSize: 500, // The maximum size of each chunk
    separators: ["\n\n", "\n", " ", ""], // The separators to split the text at (e.g., paragraphs, spaces, etc.)
  });

/**
 * Function to load a text file and return LangChain documents
 * @param file - The input file to load
 * @returns - Loaded LangChain documents
 */
export const loadFileAndReturnLangDocuments = (file: File) => {
  const result = new TextLoader(file); // Initialize the TextLoader with the file
  return result.load(); // Load the file and return LangChain documents
};

/**
 * Example usage of loading a file and processing it
 */
const file = new File(
  ["This is an example text file. It can be as large as needed."],
  "example.txt"
); // Basic file example
const text = await loadFileAndReturnLangDocuments(file); // Load the text file and return documents

/**
 * Process the loaded documents to split them into smaller chunks
 */
const output = await recursiveCharacterTextSplitter.splitDocuments(text); // Split the documents into chunks based on the defined splitter

/**
 * Example: Storing the split documents in a vector store
 * This assumes you have a vector store set up (like a Supabase vector store or similar)
 */
const storedData = await mistralVectorStore.addDocuments(output); // Add the chunks to the vector store
```

# Similarity search from input

```tsx
import { NextResponse } from "next/server";
import { routeErrorHandler } from "@/lib/api-response"; // Custom error handler for standardizing error responses
import { inputSchema } from "@/lib/zod-validation"; // Zod schema for validating input
import { mistralEmbeddingModelName } from "@/utils/mistal"; // Utility function to interact with Mistral AI chat

import { EventStream } from "@mistralai/mistralai/lib/event-streams";
import { CompletionEvent } from "@mistralai/mistralai/models/components";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"; // For storing embeddings in Supabase
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { createClient } from "@supabase/supabase-js";
import { Mistral } from "@mistralai/mistralai";

export interface MistralMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface MistralChatResponse {
  response: string;
}

export type ShowFormat = "JSON" | "text" | "markdown";

/**
 * Handles POST requests to the API route.
 * This function processes the input, searches a vector store for relevant content,
 * and streams the response from the Mistral AI model based on that content.
 *
 * @param request - The incoming HTTP request.
 * @returns A streaming response with the AI-generated content.
 */

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
function iteratorToStream(iterator: AsyncGenerator<Uint8Array>) {
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
export async function POST(request: Request) {
  try {
    // Step 1: Parse and validate the request body
    // Expecting the input text from the user that will be used for the AI query
    const body = await request.json();
    const { inputText } = inputSchema.parse(body); // Validate the input using the schema

    /**
     * Step 2: Search the input text in the vector store (Supabase) for relevant context.
     * The goal here is to retrieve documents that are similar to the user's input.
     * We perform a similarity search to find the top 3 most relevant documents and combine them into one content block.
     */ const minstralEmbedingsInstance = new MistralAIEmbeddings({
      model: mistralEmbeddingModelName, // Specify the model to use for embeddings (default is `mistral-embed`)
    });
    const sbApiKey = process.env.SUPABASE_API_KEY as string; // Supabase API key for authentication
    const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT as string; // Supabase URL for the chatbot project
    const supabaseClient = createClient(sbUrl, sbApiKey);
    const mistralVectorStore = new SupabaseVectorStore(
      minstralEmbedingsInstance,
      {
        client: supabaseClient, // Supabase client to interact with the database
        tableName: "documents_scrimba_mistral_langchain", // Table where document embeddings are stored
        queryName: "match_documents_scrimba_mistral_langchain", // Query to match and search for documents
      }
    );
    const supabaseContent = await mistralVectorStore
      .similaritySearch(inputText, 3) // Query the vector store with the input text
      .then((docs) => docs.map((d) => d.pageContent).join(`\n\n`)); // Join the relevant content into one string

    // Step 3: Build a request to the Mistral AI model
    // We're passing the combined context (from Supabase) along with the user's question to the AI model
    const mistralClient = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

    const mistralChatStreamResponse = async (
      messages: MistralMessage[], // Array of messages exchanged in the conversation
      temperature: number = 0.7 // Controls the creativity of the AI's response (higher values = more randomness)
    ): Promise<EventStream<CompletionEvent>> => {
      try {
        // Call the Mistral chat stream API, passing in the messages and the model configuration
        const chatResponse = await mistralClient.chat.stream({
          model: "mistral-large-latest", // The specific model to use for chat responses
          // Check if there is a system message. If not, add a default system message
          messages: messages.some((m) => m.role === "system")
            ? messages // If a system message is already present, use the provided messages
            : [
                {
                  role: "system", // System role is used to define the behavior of the assistant
                  content:
                    "You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.",
                },
                ...messages, // Add the provided messages after the system message
              ],
          temperature: temperature, // Pass the temperature to control the randomness
          responseFormat: {
            type: "text", // Define the response format as plain text
          },
        });

        return chatResponse; // Return the chat response as an event stream
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error fetching chat response:", error);
        throw new Error("Failed to get chat response");
      }
    };
    const chatResponse = await mistralChatStreamResponse([
      {
        role: "system", // The system message sets the behavior of the AI
        content: `You're a helpful ai assistant name handbook assistant.
           You can only answer {Question} based on {Handbook context} only.
            If the answer is not available in context, simply reply with:
            'Sorry!! I don't know the answer.' You can also answer greetings too.`,
      },
      {
        role: "user", // The user message contains the actual input question along with the context
        content: `Handbook context: ${supabaseContent} - Question: ${inputText}`,
      },
    ]);

    // Step 4: Convert the chat response iterator into a stream
    // Mistral returns the response in the form of an iterator. This utility function will convert the iterator into a readable stream
    const stream = iteratorToStream(makeIterator(chatResponse));

    // Step 5: Return the stream as a response with a plain text content type
    // The response is streamed to the client as plain text, so it can be processed in real-time
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain", // Indicating that the response is plain text
      },
    });
  } catch (error) {
    // Step 6: Handle errors if anything goes wrong during the process
    // If an error occurs, it is logged and passed to a custom error handler to return a standardized error response
    console.log("Error", { error });
    return routeErrorHandler(error); // Custom error handler
  }
}
```

### **Vector Store** – Searching for Relevant Context

The **vector store** is a key part of the system and plays a significant role in the overall architecture of the application. Here's why it’s important:

- **Vector Stores**: These are databases optimized for storing **embeddings**, which are numerical representations of text. Each document is converted into a vector (a list of numbers), and similar documents can be found by measuring the **cosine similarity** between vectors. This allows the system to search for documents that are contextually similar to the user’s input, not just those with matching keywords.
- In this example, the `SupabaseVectorStore` is used to store and search document embeddings. The search retrieves relevant documents based on similarity to the input question, and these documents are passed to the Mistral model to generate an appropriate response. This is the foundation of **retrieval-augmented generation (RAG)**, where AI can generate responses based on actual context retrieved from a database.

### **How `similaritySearch` Works**:

1. **Convert Input Text to Embeddings**:

   The first step is to convert the user’s input (`inputText`) into an embedding using a specific model (e.g., Mistral AI in your case). This embedding is a numerical representation of the text's meaning in a high-dimensional space.

2. **Query the Vector Store**:

   The **`similaritySearch`** method queries the vector store using the **embedding** of the input text. It compares the input embedding to the embeddings of all stored documents in the vector store.

3. **Cosine Similarity**:

   The search relies on **cosine similarity**, which is a measure of similarity between two vectors. It checks how similar the input embedding is to the stored embeddings, identifying the ones that are closest in terms of semantic meaning. The higher the similarity, the closer the vectors are in space.

4. **Return the Top Results**:

   The **`similaritySearch`** method allows you to specify how many results you want to retrieve (e.g., 3 in your case). It returns the most relevant documents based on similarity, sorted by their relevance to the input.

   ```jsx
   javascript;
   CopyEdit;
   const supabaseContent = await mistralVectorStore
     .similaritySearch(inputText, 3) // Query the vector store with the input text
     .then((docs) => docs.map((d) => d.pageContent).join(`\n\n`)); // Join the relevant content into one string
   ```

   - **`inputText`**: The user’s query or input.
   - **`3`**: The number of top documents to retrieve based on similarity. This can be adjusted as needed.
   - **`docs.map((d) => d.pageContent)`**: After retrieving the documents, this maps over the results and extracts their `pageContent` (the actual text of the documents).
   - **`.join(\n\n)`**: Joins the retrieved documents’ content into a single string, separating them with double newlines for better readability.

---

### **Example:**

Let’s say you have a vector store containing various documents about cheese. When a user asks a question like **"What are the benefits of cheese?"**, the **`similaritySearch`** will:

1. Convert the question into an embedding.
2. Search the vector store for the most similar documents about cheese.
3. Return the top 3 documents that are semantically similar to the user's question, such as:
   - Document 1: "Cheese is a rich source of calcium."
   - Document 2: "Cheese contains healthy fats that benefit your heart."
   - Document 3: "Cheese is packed with vitamins and minerals."

These documents are then combined into one string and sent as context for further processing or response generation.

---

### **Key Parameters of `similaritySearch`**:

- **Input Embedding**: The method compares the input embedding (which represents the meaning of the input) with the stored embeddings in the vector store.
- **Top Results Count**: You can specify how many similar documents you want to retrieve (e.g., top 3).
- **Custom Query**: The search might include additional parameters, such as filters to limit the search scope (e.g., by document type or topic).

# Implementing AI Agent Function Calling

![arfatur-rahman-mistral-basic-ai-agent-using-nextjs-with-typescript-with-full-backend-code](https://res.cloudinary.com/dftpiu3ai/image/upload/v1741961551/portfolio/zsrl52kcde6r2qhrc8s2.webp)

After asking a question it’ll go thorugh `LLM` with some specific instructions as to figure out what kind of tools it has available to figure out the answer for the user. And then if it is a good model, it’ll look at this query and realize for itself that i actually need to call the `fetchOrder()` function to give the user a good reply. Then it’ll instruct software to actually perform this function call. This is often done via regular code like if else conditionals. So through the code you have written, you’ll ensure that when the AI wants to call this function, you’ll actually perform this function call and get the order data to then again, will return to the LLM, it’ll then read that data, which probably comes in the form of an object and then turn that into a human readable response, like yes, your order is expected to arrive in …….., which again, then results in a happy user,

### Helper Functions to Fetch Payment Data

**Raw data**

**`transactionData`**: A hardcoded array representing transactions with `transaction_id`, `customer_id`, `payment_amount`, `payment_date`, and `payment_status`. This is a mock database for testing the payment functions

```tsx
const transactionData = [
  {
    transaction_id: "T1001",
    customer_id: "C001",
    payment_amount: 125.5,
    payment_date: "2021-10-05",
    payment_status: "Paid",
  },
];
```

There are mainly 2 function i’m using one is for response payment status by receiving transactionId from user. another is to response payment date by transactionId.

Both function search data from `transactionData` and return requried data

- **`getPaymentStatus`**: This function takes a `transactionId`, searches the `transactionData` array, and returns the payment status if the transaction is found.
- **`getPaymentDate`**: Similar to the previous function, it fetches the `payment_date` of a given `transactionId`.

These functions serve as "tools" that can be used by the assistant to interact with the mock data.

```tsx
export function getPaymentStatus({ transactionId }: { transactionId: string }) {
  const transaction = transactionData.find(
    (row) => row.customer_id === transactionId
  );
  if (transaction)
    return JSON.stringify({ status: transaction.payment_status });

  return JSON.stringify({ error: "transaction id not found." });
}
export function getPaymentDate({ transactionId }: { transactionId: string }) {
  const transaction = transactionData.find(
    (row) => row.transaction_id === transactionId
  );
  if (transaction) {
    return JSON.stringify({ date: transaction.payment_date });
  }
  return JSON.stringify({ error: "transaction id not found." });
}
```

### Explain Tools

### What Are Tools in Mistral AI, and Why Are They Beneficial?

In Mistral AI, **tools** refer to external functions or services that the language model can invoke during a conversation to fetch data, perform actions, or interact with systems outside the AI model. These tools allow the assistant to perform specific tasks that go beyond generating text, enabling it to retrieve or manipulate real-world data in real time.

For example, in your code, you define two tools: `getPaymentStatus` and `getPaymentDate`. These tools are functions that the assistant can call when it needs information not available in its internal knowledge base but can be retrieved from an external data source, like a database or an API.

interfaces that agents, chains, or LLMs can use to interact with the outside world, encapsulating functions, their schemas (name, description, inputs), and whether the result should be returned directly

**`mistralTools`**: This array defines the available functions (tools) that Mistral can invoke to fetch payment information. Each tool includes:

- **`name`**: The function's name.
- **`description`**: What the function does.
- **`parameters`**: The structure of the parameters that the function expects (e.g., `transactionId`).

These tools allow the assistant to interact with the mock payment data.

```tsx
import { Tool } from "@mistralai/mistralai/models/components";
const mistralTools: Tool[] = [
  {
    type: "function",
    function: {
      name: "getPaymentStatus",
      description: "Get the payment date of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id.",
          },
        },
        required: ["transactionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPaymentDate",
      description: "Get payment status of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id.",
          },
        },
        required: ["transactionId"],
      },
    },
  },
];
```

### **Define Available Functions for Tool Calls**

```tsx
const availableFunctions = {
  getPaymentDate,
  getPaymentStatus,
} as const;
```

**`availableFunctions`**: This object stores the actual functions (`getPaymentDate`, `getPaymentStatus`) that can be invoked when the assistant decides to call one of the tools. The `as const` ensures the function names are treated as literal types, providing better type safety.

### **Helper Function for Delay**

```tsx
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
```

**`delay`**: This is a utility function that returns a promise which resolves after a specified number of milliseconds. It's used to simulate a delay between interactions with the assistant, especially when making tool calls

This function is use because in `Mistral Ai` free tier one have only to call mistal api 1 per second.

### Final Code

```tsx
import { formatResponse, routeErrorHandler } from "@/lib/api-response";

import { Mistral } from "@mistralai/mistralai"; // Import the Mistral client library to interact with Mistral AI

export interface MistralMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string; // Optional name field
  toolCallId?: string; // Optional name field
}

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

// Retrieve the Mistral API key from environment variables
const apiKey = process.env.MISTRAL_API_KEY;
// Initialize the Mistral client with the API key (this is used to interact with Mistral's APIs)
export const mistralClient = new Mistral({ apiKey: apiKey });

import { Tool } from "@mistralai/mistralai/models/components";
import { z } from "zod";

const transactionData = [
  {
    transaction_id: "T1001",
    customer_id: "C001",
    payment_amount: 125.5,
    payment_date: "2021-10-05",
    payment_status: "Paid",
  },
];

export function getPaymentStatus({ transactionId }: { transactionId: string }) {
  const transaction = transactionData.find(
    (row) => row.customer_id === transactionId
  );
  if (transaction)
    return JSON.stringify({ status: transaction.payment_status });

  return JSON.stringify({ error: "transaction id not found." });
}
export function getPaymentDate({ transactionId }: { transactionId: string }) {
  const transaction = transactionData.find(
    (row) => row.transaction_id === transactionId
  );
  if (transaction) {
    return JSON.stringify({ date: transaction.payment_date });
  }
  return JSON.stringify({ error: "transaction id not found." });
}
export const mistralTools: Tool[] = [
  {
    type: "function",
    function: {
      name: "getPaymentStatus",
      description: "Get the payment date of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id.",
          },
        },
        required: ["transactionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPaymentDate",
      description: "Get payment status of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id.",
          },
        },
        required: ["transactionId"],
      },
    },
  },
];

// Available functions for tool calls
const availableFunctions = {
  getPaymentDate,
  getPaymentStatus,
} as const; // Using `as const` to make function names literal types

// Helper function to create a delay (for waiting before next operation)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Handles POST requests to interact with the Mistral AI model.
 * @param request - The incoming request object containing user input.
 * @returns Formatted response or error message.
 */
export async function POST(request: Request) {
  try {
    // Step 1: Parse and validate input text from the user request
    const body = await request.json();
    const { inputText } = inputSchema.parse(body); // Validates input using Zod schema

    // Step 2: Prepare initial messages with system behavior and user input
    const messages: MistralMessage[] = [
      {
        role: "system", // Defines the assistant's role and behavior
        content: "You are a friendly assistant",
      },
      {
        role: "user", // User input message
        content: inputText,
      },
    ];

    // Step 3: Send messages to the Mistral chat model for a response
    const response = await mistralClient.chat.complete({
      model: "mistral-large-latest", // AI model to generate the response
      messages,
      toolChoice: "any", // Allow any tool to be chosen
      tools: mistralTools, // Available tools for the assistant
      temperature: 0.7, // Controls the randomness of responses
      responseFormat: {
        type: "text", // Plain text response format
      },
    });

    // Step 4: Check if the assistant provided a valid response
    if (
      response?.choices &&
      response.choices[0]?.message?.role === "assistant"
    ) {
      // Add assistant's response to the messages
      messages.push(response.choices[0]?.message as MistralMessage);

      // Step 5: Handle completion based on the assistant's finish reason
      if (response?.choices[0].finishReason === "stop") {
        // If the assistant finishes the task, return the response
        return formatResponse(
          {
            finalAnswer: response?.choices[0].message.content,
            ...response,
          },
          "Data fetched successfully"
        );
      } else if (
        response?.choices &&
        response.choices[0]?.finishReason === "tool_calls"
      ) {
        // Handle tool calls if the assistant requires additional functions
        const toolCalls = response.choices[0]?.message?.toolCalls;
        if (toolCalls && toolCalls.length > 0) {
          // Extract the function name and arguments from tool calls
          const functionName = toolCalls[0]?.function
            ?.name as keyof typeof availableFunctions; // Ensures it's a valid function
          const functionArgs = JSON.parse(
            toolCalls[0]?.function?.arguments as string
          );

          // Call the relevant function with arguments
          const functionResponse =
            availableFunctions[functionName](functionArgs);

          // Add tool response to messages
          messages.push({
            role: "tool",
            name: functionName,
            content: functionResponse,
            toolCallId: toolCalls[0].id,
          });

          // Wait for a short delay before continuing
          await delay(3000);

          // Step 6: Send the updated messages back to the Mistral model
          const functionREs = await mistralClient.chat.complete({
            model: "mistral-large-latest",
            messages,
          });

          // Return the response after the tool function execution
          return formatResponse(functionREs, "Data fetched successfully");
        }

        // Default response if no special conditions were met
        return formatResponse(response, "Data fetched successfully");
      }
    }
  } catch (error) {
    // Log and return an error response if any step fails
    console.log("Error", { error });
    return routeErrorHandler(error);
  }
}
```
