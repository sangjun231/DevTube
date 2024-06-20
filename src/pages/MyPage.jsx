import { ToastContainer, toast } from 'react-toastify';
import { useVideos, useDeleteVideo } from '../lib/supabase/videoApi';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/supabase';
import useIdStore from '../zustand/idStore';
import { updateUserNickname } from '../lib/supabase/userApi';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const { data: videos, error: fetchError, isLoading } = useVideos();
  const deleteVideoMutation = useDeleteVideo();
  const { id } = useIdStore((state) => state);
  const [nickname, setNickname] = useState('');
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
    const { data, error } = await updateUserNickname(value, userId);
    if (error) {
      toast.error('닉네임 변경에 실패했습니다. 다시 로그인하시길 바랍니다.');
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
      <ToastContainer className="mt-12" position="top-right" />
      <div className="rounded-md2 mx-auto my-0 max-w-sm bg-slate-100 p-4">
        <h2 className="mb-4">프로필 수정</h2>
        <div className="mb-4">
          <label className="mb-2 block">닉네임</label>
          <input
            className="box-border w-full p-2"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-20">
          <button
            className="mb-2 flex w-full cursor-pointer items-center justify-center rounded border-none bg-customBlue p-2 text-white no-underline hover:underline"
            onClick={() => updateNickname(nickname, id)}
          >
            프로필 업데이트
          </button>
          <Link
            className="mb-2 flex w-full cursor-pointer items-center justify-center rounded border-none bg-customPurple p-2 text-white no-underline hover:underline"
            to="/"
          >
            돌아가기
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="flex justify-center font-bold">Saved Videos</h1>
        <div className="grid grid-cols-3 gap-10">
          {likeVideos.map((video) => (
            <div key={video.id}>
              <h3 dangerouslySetInnerHTML={{ __html: video.video_title }} className="w-full truncate"></h3>
              <div className="aspect-h-9 aspect-w-16">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <button className="mt-2 text-red-500" onClick={() => handleDelete(video.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
