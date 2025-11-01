
import MainLayout from '../shared/layouts/MainLayout';
import { PostList } from '../widgets/PostList/PostList.tsx';
import { ThemeProvider } from '../shared/lib/theme/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <PostList />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
