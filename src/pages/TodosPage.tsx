import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserTabs from '../widgets/UserTabs/UserTabs';
import type { Todo } from '../entities/todo/model/types';

export const TodosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const data = (await response.json()) as Todo[];
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodos();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!id) {
    return <div>User ID is required</div>;
  }

  return (
    <div className="todos-page">
      <h1>User {id} Todos</h1>
      <UserTabs userId={id} />
      <div className="todos-list">
        {todos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span>{todo.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

