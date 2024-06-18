const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export const postUserSurveyAPI = async (answers) => {
  
};
