import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const userRegist = async (email, password) => {
  await supabase.auth.signUp({
    email,
    password
  });
};

export const userLogin = async (email, password) => {
  await supabase.auth.signInWithPassword({
    email,
    password
  });
};
