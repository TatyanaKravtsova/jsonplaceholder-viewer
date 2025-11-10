import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

export const PhotosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [photosResponse, albumResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`),
          fetch(`https://jsonplaceholder.typicode.com/albums/${id}`),
        ]);
        
        if (!photosResponse.ok || !albumResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const photosData = await photosResponse.json();
        const albumData = await albumResponse.json();
        
        setPhotos(photosData);
        setAlbum(albumData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userId = album?.userId;

  return (
    <div className="photos-page">
      {userId && <Link to={`/users/${userId}/albums`}>← Back to Albums</Link>}
      <h1>Album {id} Photos</h1>
      <div className="photos-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

