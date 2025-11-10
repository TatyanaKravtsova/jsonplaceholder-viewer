import { ThemeProvider } from '../shared/lib/theme/ThemeContext';
import { RouterProvider } from './providers/router/RouterProvider';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
}

export default App;
