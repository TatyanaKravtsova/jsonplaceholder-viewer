import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Получить todos по userId
    getTodosByUserId: builder.query<Todo[], number>({
      query: (userId) => `users/${userId}/todos`,
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
              { type: 'Todo', id: `LIST-${userId}` },
            ]
          : [{ type: 'Todo', id: `LIST-${userId}` }],
    }),
    // Получить все todos
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: ['Todo'],
    }),
    // Получить todo по id
    getTodoById: builder.query<Todo, number>({
      query: (todoId) => `todos/${todoId}`,
      providesTags: (_result, _error, todoId) => [{ type: 'Todo', id: todoId }],
    }),
  }),
});

export const { useGetTodosByUserIdQuery, useGetTodosQuery, useGetTodoByIdQuery } = todosApi;

