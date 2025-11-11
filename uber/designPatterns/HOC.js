import React from "react";

// Higher-Order Component (HOC) for authentication
const withAuth = (WrappedComponent) => {
    return (props) => {
        const isAuthenticated = true; // Simulating auth check

        if (!isAuthenticated) {
            return <h2>🚫 Access Denied! Please log in.</h2>;
        }

        return <WrappedComponent {...props} />;
    };
};

// Normal Component
const Dashboard = () => <h2>📊 Welcome to the Dashboard!</h2>;

// Enhance it with authentication
const ProtectedDashboard = withAuth(Dashboard);

export default function App() {
    return <ProtectedDashboard />;
}
