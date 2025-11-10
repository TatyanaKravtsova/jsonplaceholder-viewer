import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserTabs from '../widgets/UserTabs/UserTabs';

interface Album {
  userId: number;
  id: number;
  title: string;
}

export const AlbumsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlbums();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!id) {
    return <div>User ID is required</div>;
  }

  return (
    <div className="albums-page">
      <h1>User {id} Albums</h1>
      <UserTabs userId={id} />
      <div className="albums-list">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <Link to={`/albums/${album.id}/photos`}>
              <h3>{album.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

