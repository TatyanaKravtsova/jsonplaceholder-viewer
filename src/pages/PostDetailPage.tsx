import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentList, { type CommentItem } from '../widgets/CommentList/ui/CommentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
        ]);

        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }

        const postData = await postResponse.json() as Post;
        const commentsData = await commentsResponse.json() as Array<{ id: number; body: string; [key: string]: unknown }>;

        setPost(postData);
        setComments(commentsData.map((c) => ({ id: c.id, body: c.body })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    return <div>Error: {error || 'Post not found'}</div>;
  }

  return (
    <div className="post-detail">
      <Link to="/posts">← Back to Posts</Link>
      <div className="post-card">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <CommentList comments={comments} />
    </div>
  );
};

