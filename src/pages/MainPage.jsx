import { useState } from 'react';
import { useVideos, useAddVideo, useDeleteVideo } from '../lib/supabase/videoApi';
import { searchYouTubeVideos } from '../lib/api/youtubeAPI';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const { data: videos, error: fetchError, isLoading } = useVideos();
  const addVideoMutation = useAddVideo();
  const deleteVideoMutation = useDeleteVideo();

  const searchVideos = async (e) => {
    e.preventDefault();
    try {
      const youtubeVideos = await searchYouTubeVideos(query);
      const videosToAdd = youtubeVideos.map((video) => ({
        video_title: video.snippet.title,
        video_id: video.id.videoId
      }));
      await addVideoMutation.mutateAsync(videosToAdd);
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVideoMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  return (
    <div>
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
        {videos.map((video) => (
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
  );
};

export default MainPage;
