
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
const hasValidConfig = supabaseUrl && supabaseAnonKey;

// Create a mock/dummy supabase client if not configured
export const supabase = hasValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock implementation to prevent runtime errors
      functions: {
        invoke: async (name: string, options?: any) => {
          console.warn(`Supabase not configured. Function "${name}" invocation simulated.`);
          // Simulate a successful response for the create-payment function
          if (name === 'create-payment') {
            return {
              data: {
                url: '/payment-success', // Local redirect for demo purposes
                success: true,
              },
              error: null,
            };
          }
          return { data: null, error: new Error('Supabase not configured') };
        },
      },
      // Add other required methods as needed
      auth: {
        signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: null, error: null, unsubscribe: () => {} }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
      }),
    };

// Add a notification to console if Supabase is not configured
if (!hasValidConfig) {
  console.warn(
    'Supabase URL or Anon Key not provided. Using mock Supabase client. The application will work with limited functionality.'
  );
}
