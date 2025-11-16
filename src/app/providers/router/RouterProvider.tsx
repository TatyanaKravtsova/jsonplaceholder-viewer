import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../../../shared/layouts/MainLayout';
import { PostsPage } from '../../../pages/PostsPage.tsx';
import { PostDetailPage } from '../../../pages/PostDetailPage.tsx';
import { AlbumsPage } from '../../../pages/AlbumsPage.tsx';
import { PhotosPage } from '../../../pages/PhotosPage.tsx';
import { TodosPage } from '../../../pages/TodosPage.tsx';
import { UserPostsPage } from '../../../pages/UserPostsPage.tsx';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/users/:id/albums" element={<AlbumsPage />} />
          <Route path="/albums/:id/photos" element={<PhotosPage />} />
          <Route path="/users/:id/todos" element={<TodosPage />} />
          <Route path="/users/:id/posts" element={<UserPostsPage />} />
          <Route path="/" element={<PostsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};



