import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useAddVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (video) => {
      const { data, error } = await supabase.from('videos').insert(video);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['videos']);
    }
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data, error } = await supabase.from('videos').delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['videos']);
    }
  });
};
