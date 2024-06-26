import { toast } from 'react-toastify';
import { useVideos, useDeleteVideo } from '../lib/supabase/videoApi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase/supabase';
import useIdStore from '../zustand/idStore';
import { updateUserNickname } from '../lib/supabase/userApi';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState('');
  const { data: videos, error: fetchError, isLoading } = useVideos();
  const deleteVideoMutation = useDeleteVideo();
  const { id } = useIdStore((state) => state);
  const nicknameInput = useRef();
  const navigate = useNavigate();

  const likeVideos = videos ? videos.filter((video) => video.video_like === user?.id) : [];

  const handleDelete = (id) => {
    try {
      toast.success('해당 영상이 삭제되었습니다.');
      deleteVideoMutation.mutate(id);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const updateNickname = async (value, userId) => {
    if (!(value.length >= 4 && value.length <= 10)) {
      toast.error('닉네임은 4자리 이상, 10자리 이하여야 합니다.');
      nicknameInput.current.focus();
      return;
    }
    if (!confirm(`닉네임을 '${value}'로(으로) 변경하시겠습니까?`)) {
      nicknameInput.current.focus();
      return;
    }
    const { data, error } = await updateUserNickname(value, userId);
    if (error) {
      toast.error('닉네임 변경에 실패했습니다. 다시 로그인하시길 바랍니다.');
      nicknameInput.current.focus();
      return;
    }
    if (data) {
      navigate(0);
      return;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  return (
    <>
      <div className="mb-20 flex w-full flex-col gap-8">
        <h1 className="font-['DungGeunMo'] text-4xl font-bold">닉네임 변경</h1>
        <div className="flex gap-5">
          <input
            className="min-w-72 rounded-md border-2 border-black p-2 outline-none"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            ref={nicknameInput}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <button
            className="rounded-md border-2 border-yellow-300 bg-yellow-100 pl-5 pr-5 hover:bg-yellow-200"
            onClick={() => updateNickname(nickname, id)}
          >
            완료
          </button>
          <button
            className="rounded-md border-2 border-slate-300 bg-slate-100 pl-5 pr-5 hover:bg-slate-200"
            onClick={() => navigate('/')}
          >
            메인으로
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="mb-8 flex justify-start font-['DungGeunMo'] text-4xl font-bold">저장한 영상</h1>
        <div className="grid grid-cols-3 gap-10">
          {likeVideos.map((video) => (
            <div key={video.id}>
              <h3
                dangerouslySetInnerHTML={{ __html: video.video_title }}
                className="mb-2 w-full truncate font-bold"
              ></h3>
              <div className="aspect-h-9 aspect-w-16">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <button className="mt-2 font-bold text-red-500" onClick={() => handleDelete(video.id)}>
                삭제하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
