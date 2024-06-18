import { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const searchVideos = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=9&q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  return (
    <div>
      <h1 className="flex justify-end font-bold">YouTube Video Search</h1>
      <div className="mb-8 flex items-center justify-end">
        <input
          className="w-100 box-border border-2"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search term"
        />
        <button className="ml-4" onClick={searchVideos}>
          Search
        </button>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3 dangerouslySetInnerHTML={{ __html: video.snippet.title }} className="w-full truncate"></h3>
            <div className="aspect-w-16 aspect-h-9">
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
