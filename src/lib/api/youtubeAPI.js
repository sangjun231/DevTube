import axios from 'axios';

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const cgi_1 = 27;
const cgi_2 = 28;

export const searchYouTubeVideos = async (query) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=9&videoCategoryId=${(cgi_1, cgi_2)}&q=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    throw error;
  }
};
