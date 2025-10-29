import React from 'react';
import PostCard from '../../entities/post/ui/PostCard';

const mockPosts = [
  { id: 1, title: 'First Post', content: 'This is first post' },
  { id: 2, title: 'Second Post', content: 'This is second post' },
  { id: 3, title: 'Third Post', content: 'This is third post' },
];

export const PostList: React.FC = () => {
  return (
    <div className="post-list">
      {mockPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;