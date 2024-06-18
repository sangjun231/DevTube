import axios from 'axios';

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

export const searchYouTubeVideos = async (query) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=9&q=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    throw error;
  }
};
