import { Provider } from 'react-redux';
import { ThemeProvider } from '../shared/lib/theme/ThemeContext';
import { RouterProvider } from './providers/router/RouterProvider';
import { store } from './providers/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
