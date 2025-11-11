import React from 'react';

const RemoteAuth = React.lazy(() => import('authApp/Auth'));

export default function AuthWrapper() {
  return (
    <React.Suspense fallback={<div>Loading Auth...</div>}>
      <RemoteAuth />
    </React.Suspense>
  );
}
