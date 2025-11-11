import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard';
import { AuthProvider } from 'shared-lib';

const root = createRoot(document.getElementById('root'));
root.render(<AuthProvider><Dashboard /></AuthProvider>);
