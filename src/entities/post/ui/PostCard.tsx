import React from 'react';
import type { Post } from '../model/types';

type PostCardData = Pick<Post, 'id' | 'title' | 'body'>;

interface PostCardProps {
  post: PostCardData;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card" aria-labelledby={`post-${post.id}-title`}>
      <h3 id={`post-${post.id}-title`}>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostCard;