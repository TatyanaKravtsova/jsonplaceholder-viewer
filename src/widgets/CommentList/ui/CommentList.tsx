import React, { useCallback, useState } from 'react';

export interface CommentItem {
  id: number;
  body: string;
}

interface CommentListProps {
  comments: CommentItem[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="comment-list">
      <button className="btn btn-secondary" onClick={toggle} aria-expanded={isOpen}>
        {isOpen ? 'Hide comments' : 'Show comments'}
      </button>
      {isOpen && (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>{c.body}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;



