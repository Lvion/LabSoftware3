import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ProtectedRouteProps } from '../../types/ProtectedRoute';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
    const { user } = useContext(UserContext);
    return user ? <Component /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
