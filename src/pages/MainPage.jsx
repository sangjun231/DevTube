// src/MainPage.js
import { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const searchVideos = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  return (
    <div>
      <h1>YouTube Video Search</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search term" />
      <button onClick={searchVideos}>Search</button>
      <div className="grid auto-cols-auto grid-cols-3">
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3 dangerouslySetInnerHTML={{ __html: video.snippet.title }}></h3>
            {/* <p dangerouslySetInnerHTML={{ __html: video.snippet.description }}></p> */}
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
