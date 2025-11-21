import React, { useCallback, useState, type MouseEventHandler } from 'react';
import type { Comment } from '../../../entities/comment/model/types';
import { ItemList } from '../../../shared/ui/ItemList';

export type CommentItem = Pick<Comment, 'id' | 'body'>;

interface CommentListProps {
  comments: CommentItem[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="comment-list">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="comment-list-content"
      >
        {isOpen ? 'Hide comments' : 'Show comments'}
      </button>
      {isOpen && (
        <ItemList
          className="comment-items"
          role="list"
          items={comments}
          getKey={(comment) => comment.id}
          renderItem={(comment) => <span>{comment.body}</span>}
        />
      )}
    </div>
  );
};

export default CommentList;



