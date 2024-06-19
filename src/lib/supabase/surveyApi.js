import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_MY;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY_MY;

// export const supabase = createClient(supabaseUrl, supabaseKey);
import { supabase } from './supabase';

export const surveyApi = async (answers) => {
  console.log('객체 잘 받고 있나 확인', answers)
  try {
    //const userId = '32c50ec5-7438-4735-850f-d3acf8a24193';
    //const { data: userData, error: userError } = await supabase.from('users').select('id').eq('id', userId);
    //console.log(userData);
    //if(userError) {
      //throw userError;
    //}

    // if (!userData || userData.length === 0) {
    //   throw new Error('User not found');
    // }

    const getUserId = answers.userId;
    console.log('유저 아이디 확인용', getUserId);

    const { data, error } = await supabase.from('users').update({ 
      selection: answers,
    }).eq('id', getUserId);;

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getUserIdApi = async (userId) => {
  try {
    const { data, error } = await supabase.from('users').select('id').eq('id', userId);
    
    if (error) {
      throw error;
    }
    console.log('유저 아이디 확인', data[0].id);
    return data[0].id;
  } catch (e) {
    console.log(e.message);
  }
};
