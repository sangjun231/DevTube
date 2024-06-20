import { useEffect, useState } from 'react';
import { useAddVideo } from '../lib/supabase/videoApi';
import { searchYouTubeVideos } from '../lib/api/youtubeAPI';
import { ToastContainer, toast } from 'react-toastify';
import { supabase } from '../lib/supabase/supabase';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const addVideoMutation = useAddVideo();

  const searchVideos = async (e) => {
    e.preventDefault();
    await surveyVideos(query);
  };

  const surveyVideos = async (query) => {
    try {
      const youtubeVideos = await searchYouTubeVideos(query);
      setSearchResults(
        youtubeVideos.map((video) => ({
          video_title: video.snippet.title,
          video_id: video.id.videoId
        }))
      );
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  const handleAddVideo = (video) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    const videoLike = {
      ...video,
      video_like: user.id
    };
    try {
      if (!toast.isActive('addVideo')) {
        toast.success('해당 영상이 저장되었습니다.', {
          toastId: 'addVideo'
        });
        addVideoMutation.mutate(videoLike);
      }
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  useEffect(() => {
    const fetchUserAndSelection = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        const { data, error } = await supabase.from('users').select('selection').eq('id', user.id).single();
        const selectionQuery = `${data.selection.level} ${data.selection.topics.join('|')}`;
        
        setUser(user);
        setQuery(selectionQuery);
        await surveyVideos(selectionQuery);
      } catch (error) {
        console.error('Error in fetchUserAndSelection:', error);
      }
    };

    fetchUserAndSelection();
  }, []);

  return (
    <div>
      <ToastContainer className="mt-12" position="top-right" autoClose='1000' hideProgressBar='true'/>
      <form onSubmit={searchVideos}>
        <h1 className="mb-5 flex justify-center font-['DungGeunMo'] text-6xl">DevTube</h1>
        <h2 className="mb-5 flex justify-center font-['DungGeunMo'] text-xl">더 많은 내용을 검색하세요!</h2>
        <div className="mb-8 flex items-center justify-center">
          <input
            autoFocus
            className="mb-2 box-border rounded border-2 p-1"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder=" 오늘은 무슨 공부를 할까?"
          />
          <button
            className="border-3 mb-2 ml-4 flex cursor-pointer items-center justify-center rounded bg-yellow-300 p-2 text-sm font-bold text-black no-underline hover:underline"
            type="submit"
          >
            &nbsp;검색&nbsp;
          </button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {searchResults.map((video) => (
          <div key={video.video_id}>
            <h3 dangerouslySetInnerHTML={{ __html: video.video_title }} className="mb-2 w-full truncate font-bold"></h3>
            <div className="aspect-h-9 aspect-w-16">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.video_id}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button className="mt-2 font-bold text-green-500" onClick={() => handleAddVideo(video)}>
              저장하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
