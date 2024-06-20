import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/supabase';

import { searchYouTubeVideos } from '../lib/api/youtubeAPI';

const MainPage = () => {
  // const [userSelection, setUserSelection] = useState(null);
  const [selectionQuery, setSelectionQuery] = useState('');
  const [selectionVideos, setSelectionVideos] = useState([]);

  useEffect(() => {
    const fetchUserSelection = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('selection')
          .eq('id', 'faaa3839-18ee-4064-87f4-9bdc994b4bde')
          .single();

        if (error) {
          console.error('Error fetching user selection:', error);
          throw error;
        }
        console.log(data);
        const query = `${data.selection.level} ${data.selection.topics}`;
        setSelectionQuery(query);
        console.log(query);
      } catch (error) {
        console.error('Error in fetchUserSelection:', error);
      }
    };

    fetchUserSelection();
  }, []);

  //query안에 data.selection.level + data.selection.topics

  useEffect(() => {
    const renderSelectionVideos = async () => {
      try {
        const selectionVideos = await searchYouTubeVideos(selectionQuery);
        setSelectionVideos(
          selectionVideos.map((video) => ({
            video_title: video.snippet.title,
            video_id: video.id.videoId
          }))
        );
      } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
      }
    };
    renderSelectionVideos();
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
