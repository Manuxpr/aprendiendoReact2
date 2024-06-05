import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    if (!isAuthenticated) {
        return <Navigate to="/loginNeoCK" />;
    }

    return <Outlet />;
};

