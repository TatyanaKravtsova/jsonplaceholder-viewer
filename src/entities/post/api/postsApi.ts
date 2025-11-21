import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Получить все посты
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    // Получить посты по userId
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `users/${userId}/posts`,
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: `LIST-${userId}` },
            ]
          : [{ type: 'Post', id: `LIST-${userId}` }],
    }),
    // Получить пост по postId
    getPostById: builder.query<Post, number>({
      query: (postId) => `posts/${postId}`,
      providesTags: (_result, _error, postId) => [{ type: 'Post', id: postId }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostsByUserIdQuery, useGetPostByIdQuery } = postsApi;

