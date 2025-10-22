import { createRoot } from 'react-dom/client';
import Auth from './AuthApp';
import { AuthProvider } from 'shared-lib';

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Auth />
  </AuthProvider>
);