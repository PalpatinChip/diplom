import React, { useEffect, useState } from 'react';
import searchImages from '../services/rapidapiImageService';

const ImageList = ({ tag, shouldFetch }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched || !shouldFetch) return;
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching images for tag: ${tag}`);
        const result = await searchImages(tag);
        console.log('Fetched images:', result);
        setImages(result || []);
        setFetched(true);
      } catch (err) {
        console.error('Failed to fetch images:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [tag, shouldFetch, fetched]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Images</h3>
      <ul>
        {images.map((image) => (
          <li key={image.url}>
            <img src={image.url} alt={image.title} />
            <p>{image.title}</p>
            <p>Source: {image.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
