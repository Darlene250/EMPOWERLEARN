import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
        <span className="brand-icon">🌸</span>
        <span className="brand-name">EmpowerLearn</span>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
        <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>Courses</Link>
        {user?.role === 'instructor' || user?.role === 'admin'
          ? <Link to="/instructor" className={isActive('/instructor') ? 'active' : ''}>Instructor</Link>
          : null}
        {user?.role === 'admin'
          ? <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>Admin</Link>
          : null}
      </div>

      <div className="navbar-user">
        <Link to="/profile" className="nav-profile-link">
          <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff`}
            alt="avatar" className="nav-avatar" />
          <span className="nav-name">{user?.name?.split(' ')[0]}</span>
        </Link>
        <button className="btn-logout" onClick={logout}>Sign out</button>
      </div>
    </nav>
  );
};

export default Navbar;
