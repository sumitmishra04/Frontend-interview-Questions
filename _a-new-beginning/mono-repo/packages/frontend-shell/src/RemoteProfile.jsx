import React from 'react';

const RemoteProfile = React.lazy(() => import('profileApp/Profile'));

export default function ProfileWrapper() {
  return (
    <React.Suspense fallback={<div>Loading Profile...</div>}>
      <RemoteProfile />
    </React.Suspense>
  );
}
