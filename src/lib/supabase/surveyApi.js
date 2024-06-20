import { toast } from 'react-toastify';
import { supabase } from './supabase';

export const surveyApi = async ({answers, userId}) => {
  console.log('객체 잘 받고 있나 확인', answers)
  try {
    console.log('유저 아이디 확인용', userId);

    const { data, error } = await supabase.from('users').update({ 
      selection: answers,
    }).eq('id', userId);

    if (error) throw new Error(`답변 제출에 실패했습니다. 다시 시도해 주세요: ${error.message}`);

    if (!data || data) {
      console.log('제출완')
      toast.success('답변 제출이 제출되었습니다.');
      return data;
    } 

  } catch (error) {
    
    toast.error('답변 제출에 실패했습니다. 다시 시도해 주세요');
    console.log(error.message);
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
