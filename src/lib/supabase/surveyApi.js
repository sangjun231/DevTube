import { toast } from 'react-toastify';
import { supabase } from './supabase';

export const surveyApi = async (answers) => {
  console.log('객체 잘 받고 있나 확인', answers)
  try {
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
