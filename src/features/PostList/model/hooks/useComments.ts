import { useEffect, useState } from 'react';
import { type CommentItem } from '../../../widgets/CommentList/ui/CommentList';

export const useComments = (postId: number | undefined) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json() as Array<{ id: number; body: string; [key: string]: unknown }>;
        setComments(data.map((c) => ({ id: c.id, body: c.body })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return { comments, loading, error };
};



