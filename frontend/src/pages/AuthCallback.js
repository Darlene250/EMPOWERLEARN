import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user?.profile_completed) navigate('/dashboard');
      else if (user) navigate('/complete-profile');
      else navigate('/login');
    }
  }, [user, loading, navigate]);

  return (
    <div className="loading-screen">
      <div className="spinner" />
      <p style={{ marginTop: 16, color: '#888' }}>Signing you in...</p>
    </div>
  );
};

export default AuthCallback;
