import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PostCard from '../../entities/post/ui/PostCard';
import { withLoading } from '../../shared/lib/hoc/withLoading';
import { filterByLength } from '../../features/PostLengthFilter/lib/filterByLength';
import PostLengthFilter from '../../features/PostLengthFilter/ui/PostLengthFilter';
import CommentList, { type CommentItem } from '../CommentList/ui/CommentList';

interface PostItem {
  id: number;
  title: string;
  content: string;
}

const mockPosts: PostItem[] = [
  { id: 1, title: 'First Post', content: 'This is first post' },
  { id: 2, title: 'Another Second Post', content: 'This is second post with longer title' },
  { id: 3, title: 'Third', content: 'This is third post' },
  { id: 4, title: 'A very very long post title to filter', content: 'Lorem ipsum' },
];

const mockComments: Record<number, CommentItem[]> = {
  1: [ { id: 1, body: 'Nice post!' }, { id: 2, body: 'Thanks for sharing' } ],
  2: [ { id: 3, body: 'Interesting thoughts' } ],
  3: [ { id: 4, body: 'Short but sweet' } ],
  4: [ { id: 5, body: 'This title is long indeed' } ],
};

export const PostList: React.FC<{ isLoading?: boolean }> = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [minLen, setMinLen] = useState<number>(0);
  const [maxLen, setMaxLen] = useState<number | undefined>(undefined);

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const filteredPosts = useMemo(() => {
    return filterByLength(posts, minLen, maxLen);
  }, [posts, minLen, maxLen]);

  const handleFilterChange = useCallback((next: { minLength: number; maxLength?: number }) => {
    setMinLen(next.minLength);
    setMaxLen(next.maxLength);
  }, []);

  // CommentList handles its own collapse/expand

  return (
    <div className="post-list">
      <PostLengthFilter minLength={minLen} maxLength={maxLen} onChange={handleFilterChange} />
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-with-actions">
          <PostCard post={post} />
          <CommentList comments={mockComments[post.id] || []} />
        </div>
      ))}
    </div>
  );
};

const PostListWithLoading = withLoading(PostList);
export default PostListWithLoading;