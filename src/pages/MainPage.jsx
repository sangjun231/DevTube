import { useState } from 'react';
import { searchYouTubeVideos } from '../lib/api/youtubeAPI';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const searchVideos = async (e) => {
    e.preventDefault();

    try {
      const videos = await searchYouTubeVideos(query);
      setVideos(videos);
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

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
            onClick={searchVideos}
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3 dangerouslySetInnerHTML={{ __html: video.snippet.title }} className="w-full truncate"></h3>
            <div className="aspect-h-9 aspect-w-16">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
