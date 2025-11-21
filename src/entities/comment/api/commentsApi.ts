import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Comment } from '../model/types';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    // Получить комментарии по postId
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: (result, _error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment', id: `LIST-${postId}` },
            ]
          : [{ type: 'Comment', id: `LIST-${postId}` }],
    }),
    // Получить все комментарии
    getComments: builder.query<Comment[], void>({
      query: () => 'comments',
      providesTags: ['Comment'],
    }),
  }),
});

export const { useGetCommentsByPostIdQuery, useGetCommentsQuery } = commentsApi;

