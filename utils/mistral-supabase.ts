import { createClient } from "@supabase/supabase-js"; // For interacting with Supabase
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"; // For storing embeddings in Supabase
import { minstralEmbedingsInstance } from "./mistal";
// Get environment variables for Supabase and Mistral configuration
// Why: Environment variables securely store sensitive information like API keys and URLs.
const sbApiKey = process.env.SUPABASE_API_KEY as string; // Supabase API key for authentication
const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT as string; // Supabase URL for the chatbot project
export const supabaseClient = createClient(sbUrl, sbApiKey);

/**
 * Initialize the vector store to store and query document embeddings in Supabase
 * This will allow us to store document embeddings in Supabase for later search and retrieval
 * Why: This setup enables storing and retrieving vector embeddings in Supabase, allowing for efficient semantic search.
 */
export const mistralVectorStore = new SupabaseVectorStore(
  minstralEmbedingsInstance,
  {
    client: supabaseClient, // Supabase client to interact with the database
    tableName: "documents_scrimba_mistral_langchain", // Table where document embeddings are stored
    queryName: "match_documents_scrimba_mistral_langchain", // Query to match and search for documents
  }
);
