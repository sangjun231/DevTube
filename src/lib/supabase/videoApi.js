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

// mutationFn 옵션의 video 매개변수:

// 이 매개변수는 새로운 비디오 데이터를 나타냅니다.
// 사용자가 입력한 비디오 제목, 설명, 파일 등의 정보가 이 video 객체에 포함됩니다.
// 이 video 객체는 useAddVideo 훅을 호출할 때 전달되는 인자가 됩니다.
// from('videos') 의 'videos':

// 이 문자열은 Supabase 데이터베이스의 "videos" 테이블을 나타냅니다.
// supabase.from('videos') 를 통해 "videos" 테이블과 상호작용할 수 있습니다.
// insert(video) 의 video:

// 이 video는 2번에서 설명한 video 매개변수와 동일한 객체입니다.
// insert(video) 메서드는 Supabase에 새로운 비디오 데이터를 삽입하는 역할을 합니다.
// queryClient.invalidateQueries(['videos']) 의 ['videos']:

// 이 배열은 React Query의 쿼리 키를 나타냅니다.
// 이 경우 ['videos']는 "videos" 쿼리 키를 의미합니다.
// queryClient.invalidateQueries(['videos']) 를 호출하면 "videos" 쿼리 키와 관련된 모든 쿼리가 무효화됩니다.
// 이를 통해 새로 추가된 비디오 데이터가 UI에 자동으로 반영됩니다.
// 요약하면, video 매개변수는 새로운 비디오 데이터,
// 'videos'는 Supabase 데이터베이스의 "videos" 테이블,
// ['videos']는 React Query의 "videos" 쿼리 키를 나타냅니다.
// 이 값들이 서로 연관되어 새로운 비디오 데이터를 Supabase에 저장하고,
// 관련된 쿼리를 무효화하는 역할을 합니다.

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

// useDeleteVideo 함수:

// 이 함수는 React Query의 useMutation 훅을 사용하여 구현되었습니다.
// useMutation 훅은 서버와의 상호작용(mutation)을 수행하는 데 사용됩니다.
// mutationFn 옵션:

// mutationFn 옵션은 실제로 서버와의 상호작용을 수행하는 비동기 함수입니다.
// 이 함수는 id 매개변수를 받아, Supabase API를 사용하여 "videos" 테이블에서 해당 id에 해당하는 행을 삭제합니다.
// supabase.from('videos').delete().eq('id', id) 를 통해 데이터를 삭제하고, 삭제된 데이터를 반환합니다.
// 만약 에러가 발생하면 Error 객체를 throw하여 에러 처리를 할 수 있습니다.
// onSuccess 옵션:

// onSuccess 옵션은 mutationFn이 성공적으로 실행된 후 호출되는 콜백 함수입니다.
// 이 함수에서는 queryClient.invalidateQueries(['videos']) 를 호출하여 "videos" 쿼리 키와 관련된 모든 쿼리를 무효화합니다.
// 이를 통해 UI가 자동으로 업데이트되어 삭제된 비디오 데이터가 반영됩니다.
// queryClient 변수:

// queryClient 변수는 React Query의 쿼리 클라이언트 인스턴스를 가리킵니다.
// 이 인스턴스는 useQueryClient 훅을 사용하여 가져옵니다.
// 쿼리 클라이언트는 쿼리 상태 관리, 무효화, 캐싱 등의 기능을 제공합니다.
// 문법 설명:

// useMutation 훅은 mutation 작업을 수행하는 데 사용됩니다.
// mutationFn 옵션은 실제 mutation 작업을 수행하는 비동기 함수입니다.
// onSuccess 옵션은 mutation 작업이 성공적으로 완료된 후 실행되는 콜백 함수입니다.

// 동작 원리:

// 사용자가 비디오를 삭제하면 useDeleteVideo 훅이 호출됩니다.
// mutationFn에서 Supabase API를 사용하여 해당 비디오 데이터를 삭제합니다.
// 삭제 작업이 성공적으로 완료되면 onSuccess 콜백 함수가 실행됩니다.
// onSuccess 함수에서 queryClient.invalidateQueries(['videos']) 를 호출하여 "videos" 쿼리 키와 관련된
// 모든 쿼리를 무효화합니다.
// 이에 따라 UI가 자동으로 업데이트되어 삭제된 비디오 데이터가 반영됩니다.

// mutationFn 옵션의 id 매개변수:

// 이 id 매개변수는 삭제할 비디오의 고유 식별자를 나타냅니다.
// 사용자가 비디오를 삭제할 때 전달하는 비디오 ID 값이 이 id 매개변수에 해당됩니다.
// eq('id', id) 에서 'id':

// 이 문자열 'id'는 Supabase 데이터베이스의 "videos" 테이블에 있는 "id" 열을 나타냅니다.
// Supabase에서 eq('id', id) 메서드를 사용하면 "id" 열의 값이 id 매개변수와 일치하는 행을 찾아 삭제할 수 있습니다.
// eq('id', id) 에서 id:

// 이 id는 1번에서 설명한 id 매개변수와 동일한 값입니다.
// 사용자가 삭제할 비디오의 고유 식별자가 이 id에 해당됩니다.
// Supabase에서 eq('id', id) 메서드를 통해 "id" 열의 값이 이 id와 일치하는 행을 찾아 삭제할 수 있습니다.
// 요약하면, id 매개변수는 삭제할 비디오의 고유 식별자를 나타내며,
// 'id'는 Supabase 데이터베이스의 "videos" 테이블에 있는 "id" 열을 의미합니다.
// eq('id', id) 메서드를 사용하여 "id" 열의 값이 id 매개변수와 일치하는 행을 찾아 삭제하는 역할을 합니다.
