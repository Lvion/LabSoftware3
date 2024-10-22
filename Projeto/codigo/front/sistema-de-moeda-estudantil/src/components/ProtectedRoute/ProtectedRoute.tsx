import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ElementType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
    const user = localStorage.getItem('user');  
    return user ? <Component /> : <Navigate to="/login" replace={true} />;  
};

export default ProtectedRoute;
