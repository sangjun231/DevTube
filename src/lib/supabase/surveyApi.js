import { toast } from 'react-toastify';
import { supabase } from './supabase';

export const surveyApi = async ({ answers, userId }) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        selection: answers
      })
      .eq('id', userId);

    if (error) throw new Error(`답변 제출에 실패했습니다. 다시 시도해 주세요: ${error.message}`);

    if (!data || data) {
      toast.success('답변 제출에 성공했습니다.');
    }
    
    return data;
  } catch (error) {
    toast.error('답변 제출에 실패했습니다. 다시 시도해 주세요');
    throw new Error(`답변 제출에 실패했습니다. 다시 시도해 주세요: ${error.message}`);
  }
};

export const getUserIdApi = async (userId) => {
  try {
    const { data, error } = await supabase.from('users').select('id').eq('id', userId);

    if (error) {
      throw error;
    }
    return data[0].id;
  } catch (error) {
    throw new Error(`답변 제출에 실패했습니다. 다시 시도해 주세요: ${error.message}`);
  }
};
