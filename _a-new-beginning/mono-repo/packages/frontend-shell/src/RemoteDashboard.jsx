import React from 'react';

const RemoteDashboard = React.lazy(async () => {
  try {
    const mod = await import('dashboardApp/Dashboard');
    console.log('✅ Remote Dashboard module loaded:', mod);
    return mod;
  } catch (err) {
    console.error('❌ Failed to load remote module:', err);
    throw err;
  }
});

export default function DashboardWrapper() {
  return (
    <React.Suspense fallback={<div>Loading Dashboard...</div>}>
      <RemoteDashboard />
    </React.Suspense>
  );
}
