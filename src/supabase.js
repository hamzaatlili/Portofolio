
import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase configuration is missing. Check your .env file and restart the Vite server."
  );
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
