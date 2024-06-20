import { supabase } from './supabase';

export const getUserSelection = async (userId) => {
  try {
    const { data: userSelection, error } = await supabase.from('users').select('selection').eq('id', userId).single();

    if (error) {
      console.error('Error fetching user selection:', error);
      throw error;
    }

    return userSelection;
  } catch (error) {
    console.error('Error in getUserSelection:', error);
    throw error;
  }
};
