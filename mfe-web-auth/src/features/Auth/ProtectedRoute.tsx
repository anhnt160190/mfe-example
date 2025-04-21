import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/Auth.context';

export const ProtectedRoute = ({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: string;
}) => {
  const { user, isAuthenticated, isLoading, isLoaded } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if ((!isAuthenticated || !user) && isLoaded) {
    return <Navigate to='/login' />;
  }

  if (permission && !user?.permissions.includes(permission)) {
    return null;
  }

  return <>{children}</>;
};
