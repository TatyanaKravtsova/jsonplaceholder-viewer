import { useEffect, useState, useMemo, useRef } from 'react';

export type CommentItem = {
  id: number;
  body: string;
};

export const usePostComments = (postIds: number[]) => {
  const [comments, setComments] = useState<Record<number, CommentItem[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const loadedIdsRef = useRef<Set<number>>(new Set());

  // Создаем отсортированную строку из ID для сравнения
  const postIdsKey = useMemo(() => {
    return [...postIds].sort((a, b) => a - b).join(',');
  }, [postIds]);

  useEffect(() => {
    if (postIds.length === 0) {
      return;
    }

    // Находим посты, для которых еще не загружены комментарии
    const idsToLoad = postIds.filter((id) => !loadedIdsRef.current.has(id));

    if (idsToLoad.length === 0) {
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Загружаем комментарии только для новых постов
        const commentsPromises = idsToLoad.map(async (postId) => {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
          if (!response.ok) {
            throw new Error(`Failed to fetch comments for post ${postId}`);
          }
          const data = await response.json() as Array<{ id: number; body: string; [key: string]: unknown }>;
          return {
            postId,
            comments: data.map((c) => ({ id: c.id, body: c.body })),
          };
        });

        const results = await Promise.all(commentsPromises);
        
        setComments((prevComments) => {
          const newComments = { ...prevComments };
          results.forEach(({ postId, comments: postComments }) => {
            newComments[postId] = postComments;
            loadedIdsRef.current.add(postId);
          });
          return newComments;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postIds, postIdsKey]);

  return { comments, loading, error };
};

