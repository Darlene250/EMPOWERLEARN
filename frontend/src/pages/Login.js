import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(user.profile_completed ? '/dashboard' : '/complete-profile');
    }
  }, [user, loading, navigate]);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-logo">
          <span>🌸</span>
          <h1>EmpowerLearn</h1>
        </div>
        <h2>Your education doesn't have to stop.</h2>
        <p>A flexible learning platform built for women in Africa who are balancing life and education. Learn at your own pace, from anywhere.</p>
        <div className="login-features">
          <div className="lf-item"><span>📚</span> Free courses on every topic</div>
          <div className="lf-item"><span>⏱️</span> Learn at your own pace</div>
          <div className="lf-item"><span>📱</span> Works on any device</div>
          <div className="lf-item"><span>💜</span> Built for women like you</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome</h2>
          <p>Sign in to continue your journey</p>
          <button className="btn-google" onClick={signInWithGoogle}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Continue with Google
          </button>
          <p className="login-note">Your progress is always saved. Pick up where you left off anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
