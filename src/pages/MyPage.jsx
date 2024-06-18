import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
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
    <>
      <div className="rounded-md2 mx-auto my-0 max-w-sm bg-slate-100 p-4">
        <h2 className="mb-4">프로필 수정</h2>
        <div className="mb-4">
          <label className="mb-2 block">닉네임</label>
          <input className="box-border w-full p-2" type="text" placeholder="nickname" />
        </div>
        <div className="flex gap-20">
          <button className="bg-customBlue mb-2 flex w-full cursor-pointer items-center justify-center rounded border-none p-2 text-white no-underline hover:underline">
            프로필 업데이트
          </button>
          <Link
            className="bg-customPurple mb-2 flex w-full cursor-pointer items-center justify-center rounded border-none p-2 text-white no-underline hover:underline"
            to="/"
          >
            돌아가기
          </Link>
        </div>
      </div>
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
    </>
  );
};

export default MyPage;
