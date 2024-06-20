import { useEffect, useState } from 'react';
import { useAddVideo } from '../lib/supabase/videoApi';
import { searchYouTubeVideos } from '../lib/api/youtubeAPI';
import { ToastContainer, toast } from 'react-toastify';
import { supabase } from '../lib/supabase/supabase';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 9;

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const addVideoMutation = useAddVideo();

  // const {
  //   data: videos,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isPending,
  //   error
  // } = useInfiniteQuery({
  //   queryKey: ['videos'],
  //   initialPageParam: 1,
  //   queryFn: async ({ pageParam }) => {
  //     const response = await todoApi.get('/todos', {
  //       params: { _page: pageParam, _limit: ITEMS_PER_PAGE }
  //     });
  //     return response.data;
  //   },
  //   getNextPageParam: (lastPage, allPages, lastPageParam) => {
  //     const nextPage = lastPageParam + 1;
  //     return lastPage.length === ITEMS_PER_PAGE ? nextPage : undefined;
  //   },
  //   select: ({ pages }) => pages.flat()
  // });

  // const { ref } = useInView({
  //   threshold: 1,
  //   onChange: (inView) => {
  //     if (inView && hasNextPage && !isFetchingNextPage) {
  //       fetchNextPage();
  //     }
  //   }
  // });

  const searchVideos = async (e) => {
    e.preventDefault();
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
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // if (isPending) {
  //   return (
  //     <div style={{ fontSize: 36 }}>
  //       <p>로딩중...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   console.error(error);
  //   return <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>;
  // }

  return (
    <div>
      <ToastContainer className="mt-12" position="top-right" />
      <form onSubmit={searchVideos}>
        <h1 className="flex justify-center font-bold">YouTube Video Search</h1>
        <div className="mb-8 flex items-center justify-center">
          <input
            className="mb-2 box-border rounded border-2 p-1"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search term"
          />
          <button
            className="mb-2 ml-4 flex cursor-pointer items-center justify-center rounded border-2 bg-customPurple p-1 text-white no-underline hover:underline"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {searchResults.map((video, idx) => {
          const isLastItem = searchResults.length - 1 === idx;
          return (
            // <div key={video.video_id} ref={isLastItem ? ref : null}>
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
              <button className="mt-2 text-green-500" onClick={() => handleAddVideo(video)}>
                Save
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
