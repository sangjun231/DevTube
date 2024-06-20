import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/supabase';

import { searchYouTubeVideos } from '../lib/api/youtubeAPI';

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
        const selectionQuery = `${data.selection.level} ${data.selection.topics}`;

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
    <>
      <div className="grid grid-cols-3 gap-4">
        {selectionVideos.map((video) => (
          <div key={video.video_id}>
            <h3 dangerouslySetInnerHTML={{ __html: video.video_title }} className="w-full truncate"></h3>
            <div className="aspect-h-9 aspect-w-16">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.video_id}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
