import React from 'react';
import MainLayout from '../shared/layouts/MainLayout'
import { PostList } from '../widgets/PostList/PostList.tsx';


function App() {
  return (
    <MainLayout>
      <PostList />
    </MainLayout>
  );
}

export default App;
