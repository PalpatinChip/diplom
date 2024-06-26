import React, { useEffect, useState } from 'react';
import searchVideos from '../services/rapidapiVideoService';

const VideoList = ({ tag, shouldFetch }) => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [fetched, setFetched] = useState(false);
  const videosPerPage = 3;

  useEffect(() => {
    if (fetched || !shouldFetch) return;
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching videos for tag: ${tag}`);
        const result = await searchVideos(tag);
        console.log('Fetched videos:', result);
        setVideos(result || []);
        setVisibleVideos(result.slice(0, videosPerPage));
        setIndex(videosPerPage);
        setFetched(true);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [tag, shouldFetch, fetched]);

  const loadMoreVideos = () => {
    const newIndex = index + videosPerPage;
    setVisibleVideos([...visibleVideos, ...videos.slice(index, newIndex)]);
    setIndex(newIndex);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && index < videos.length) {
      loadMoreVideos();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
      <h3>Videos</h3>
      <ul>
        {visibleVideos.map((video) => (
          <li key={video.video.videoId}>
            <h4>
              <a href={`https://www.youtube.com/watch?v=${video.video.videoId}`} target="_blank" rel="noopener noreferrer">
                {video.video.title}
              </a>
            </h4>
            <img src={video.video.thumbnails[0].url} alt={video.video.title} />
            <p>{video.video.channelTitle}</p>
            <p>{video.video.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
