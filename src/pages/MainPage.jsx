import { useEffect, useState } from 'react';
import { getUserSelection } from '../lib/supabase/userSelctionApi';
import { supabase } from '../lib/supabase/supabase';

const MainPage = () => {
  const [userSelection, setUserSelection] = useState(null);

  useEffect(() => {
    const fetchUserSelection = async () => {
      try {
        const { data: userSelection, error } = await supabase
          .from('users')
          .select('selection')
          .eq('id', '787fc251-c485-48b2-bb78-628b954992e9')
          .single();

        if (error) {
          console.error('Error fetching user selection:', error);
          throw error;
        }

        setUserSelection(userSelection);
      } catch (error) {
        console.error('Error in fetchUserSelection:', error);
      }
    };

    fetchUserSelection();
  }, []);

  return <>{JSON.stringify(userSelection)}</>;
};

export default MainPage;
