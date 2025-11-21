import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../../entities/post/ui/PostCard.tsx';
import { withLoading } from '../../shared/lib/hoc/withLoading';
import { filterByLength } from '../../features/PostLengthFilter/lib/filterByLength';
import PostLengthFilter from '../../features/PostLengthFilter/ui/PostLengthFilter';
import CommentList from '../CommentList/ui/CommentList';
import { usePosts } from '../../features/PostList/model/hooks/usePosts';
import { usePostComments } from '../../features/PostList/model/hooks/usePostComments';

export const PostList: React.FC<{ isLoading?: boolean }> = ({ isLoading: externalLoading }) => {
  const { posts, loading } = usePosts();
  const [minLen, setMinLen] = useState<number>(0);
  const [maxLen, setMaxLen] = useState<number | undefined>(undefined);

  const filteredPosts = useMemo(() => {
    return filterByLength(posts, minLen, maxLen);
  }, [posts, minLen, maxLen]);

  const postIds = useMemo(() => {
    return filteredPosts.map((post) => post.id);
  }, [filteredPosts]);

  const { comments } = usePostComments(postIds);

  const handleFilterChange = useCallback((next: { minLength: number; maxLength?: number }) => {
    setMinLen(next.minLength);
    setMaxLen(next.maxLength);
  }, []);

  if (loading || externalLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-list">
      <PostLengthFilter minLength={minLen} maxLength={maxLen} onChange={handleFilterChange} />
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-with-actions">
          <Link to={`/posts/${post.id}`}>
            <PostCard post={{ id: post.id, title: post.title, body: post.body }} />
          </Link>
          <CommentList comments={comments[post.id] || []} />
        </div>
      ))}
    </div>
  );
};

const PostListWithLoading = withLoading(PostList);
export default PostListWithLoading;