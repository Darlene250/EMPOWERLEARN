import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner" />
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (!user.profile_completed) return <Navigate to="/complete-profile" />;
  if (role && !['admin', role].includes(user.role)) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
