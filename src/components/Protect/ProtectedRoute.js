import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts/index';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth(); 

    // If the auth state is still loading, show a spinner
    // If no user exists, redirect to login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;