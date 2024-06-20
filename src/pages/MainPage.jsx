import { useEffect, useState } from 'react';
import { getUserSelection } from '../lib/supabase/userSelctionApi';
//같은 로직인데 setUserSelection부분이 없음
//안 쓰이는 중
import { supabase } from '../lib/supabase/supabase';

const MainPage = () => {
  const [userSelection, setUserSelection] = useState(null);

  useEffect(() => {
    const fetchUserSelection = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('selection')
          .eq('id', 'faaa3839-18ee-4064-87f4-9bdc994b4bde')
          .single();

        if (error) {
          console.error('Error fetching user selection:', error);
          throw error;
        }
        console.log(data);
        setUserSelection(data);
      } catch (error) {
        console.error('Error in fetchUserSelection:', error);
      }
    };

    fetchUserSelection();
  }, []);

  return <>돼라</>;
};

export default MainPage;
