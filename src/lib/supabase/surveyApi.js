//import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_MY;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY_MY;

// export const supabase = createClient(supabaseUrl, supabaseKey);
import { toast } from 'react-toastify';
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
    toast.success('답변이 제출되었습니다.');
    return data;
  } catch (e) {
    
    toast.error('답변 제출에 실패했습니다. 다시 시도해 주세요');
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

// export const getUserDataApi = async (userId) => {
//   try {
//     const { data, error } = await supabase.from('users').select('*').eq('id', userId);
    
//     if (error) {
//       throw error;
//     }
//     console.log('유저 아이디 확인', data[0].id);
//     return data[0].id;
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// export const getUserDataApi = async () => {
//   try {
//     const {
//       data: { session },
//       error
//     } = await supabase.auth.getSession();
//     if (error) throw new Error(error.message);

//     console.log(session.user);
//     return session.user;
//   } catch (error) {
//     throw new Error(`Get user failed: ${error.message}`);
//   }
// }