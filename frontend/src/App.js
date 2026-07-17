import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import CompleteProfile from './pages/CompleteProfile';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseViewer from './pages/CourseViewer';
import Profile from './pages/Profile';
import Instructor from './pages/Instructor';
import Admin from './pages/Admin';
import './index.css';
import Landing from './pages/Landing';

const WithNav = ({ children }) => <><Navbar />{children}</>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />

          {/* Protected - with Navbar */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <WithNav><Dashboard /></WithNav>
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <WithNav><Courses /></WithNav>
            </ProtectedRoute>
          } />
          <Route path="/course/:courseId" element={
            <ProtectedRoute>
              <WithNav><CourseViewer /></WithNav>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <WithNav><Profile /></WithNav>
            </ProtectedRoute>
          } />
          <Route path="/instructor" element={
            <ProtectedRoute role="instructor">
              <WithNav><Instructor /></WithNav>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <WithNav><Admin /></WithNav>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
