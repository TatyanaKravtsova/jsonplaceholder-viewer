import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Album'],
  endpoints: (builder) => ({
    // Получить альбомы по userId
    getAlbumsByUserId: builder.query<Album[], number>({
      query: (userId) => `users/${userId}/albums`,
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album' as const, id })),
              { type: 'Album', id: `LIST-${userId}` },
            ]
          : [{ type: 'Album', id: `LIST-${userId}` }],
    }),
    // Получить все альбомы
    getAlbums: builder.query<Album[], void>({
      query: () => 'albums',
      providesTags: ['Album'],
    }),
    // Получить альбом по id
    getAlbumById: builder.query<Album, number>({
      query: (albumId) => `albums/${albumId}`,
      providesTags: (_result, _error, albumId) => [{ type: 'Album', id: albumId }],
    }),
  }),
});

export const { useGetAlbumsByUserIdQuery, useGetAlbumsQuery, useGetAlbumByIdQuery } = albumsApi;

