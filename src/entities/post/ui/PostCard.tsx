import React from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;