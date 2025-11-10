import React, { useCallback, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../entities/post/ui/PostCard.tsx';
import { filterByLength } from '../features/PostLengthFilter/lib/filterByLength';
import PostLengthFilter from '../features/PostLengthFilter/ui/PostLengthFilter';
import CommentList from '../widgets/CommentList/ui/CommentList';
import { usePosts } from '../features/PostList/model/hooks/usePosts.ts';
import { usePostComments } from '../features/PostList/model/hooks/usePostComments';
import { withLoading } from '../shared/lib/hoc/withLoading';
import UserTabs from '../widgets/UserTabs/UserTabs';

interface UserPostsPageContentProps {
  isLoading?: boolean;
}

const UserPostsPageContent: React.FC<UserPostsPageContentProps> = ({ isLoading: externalLoading }) => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : undefined;
  const { posts, loading } = usePosts(userId);
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

  if (!id) {
    return <div>User ID is required</div>;
  }

  return (
    <div className="post-list">
      <h1>User {id} Posts</h1>
      <UserTabs userId={id} />
      <PostLengthFilter minLength={minLen} maxLength={maxLen} onChange={handleFilterChange} />
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-with-actions">
          <Link to={`/posts/${post.id}`}>
            <PostCard post={{ id: post.id, title: post.title, content: post.body }} />
          </Link>
          <CommentList comments={comments[post.id] || []} />
        </div>
      ))}
    </div>
  );
};

export const UserPostsPage = withLoading(UserPostsPageContent);

