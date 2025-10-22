import React from 'react';

const RemoteDashboard = React.lazy( () => import('dashboardApp/Dashboard'));

export default function DashboardWrapper() {
  return (
    <React.Suspense fallback={<div>Loading Dashboard...</div>}>
      <RemoteDashboard />
    </React.Suspense>
  );
}
