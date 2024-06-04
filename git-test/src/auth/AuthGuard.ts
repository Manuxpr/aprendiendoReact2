import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};