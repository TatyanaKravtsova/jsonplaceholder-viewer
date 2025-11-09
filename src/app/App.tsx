
import { useEffect, useState } from 'react';
import MainLayout from '../shared/layouts/MainLayout';
import PostList from '../widgets/PostList/PostList.tsx';
import { ThemeProvider } from '../shared/lib/theme/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      <MainLayout>
        <PostList isLoading={isLoading} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
