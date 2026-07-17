import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const GOAL_LABELS = {
  complete_degree: 'Complete my degree',
  learn_new_skill: 'Learn a new skill',
  get_job: 'Get a job or change careers',
  start_business: 'Start or grow a business',
  personal_growth: 'Personal growth',
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/enrollments')
      .then(res => setEnrollments(res.data.enrollments || []))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, []);

  const handleUnenroll = async (id) => {
    try {
      await api.delete(`/enrollments/${id}`);
      setEnrollments(prev => prev.filter(e => e.id !== id));
      toast.success('Unenrolled');
    } catch {
      toast.error('Could not unenroll');
    }
  };

  const completed = enrollments.filter(e => e.progress_percent === 100).length;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((a, e) => a + e.progress_percent, 0) / enrollments.length)
    : 0;

  return (
    <div className="page">
      {/* Welcome banner */}
      <div className="welcome-banner">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]} 🌸</h1>
          <p>Keep going - every lesson gets you closer to your goal.</p>
          {user?.learning_goal && (
            <div className="goal-tag">🎯 {GOAL_LABELS[user.learning_goal]}</div>
          )}
        </div>
        <img
          src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff&size=80`}
          alt="avatar" className="welcome-avatar"
        />
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{enrollments.length}</span>
          <span className="stat-lbl">Enrolled</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{completed}</span>
          <span className="stat-lbl">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{avgProgress}%</span>
          <span className="stat-lbl">Avg Progress</span>
        </div>
      </div>

      {/* My Courses */}
      <div className="section">
        <div className="section-head">
          <h2>My Courses</h2>
          <button className="btn-outline" onClick={() => navigate('/courses')}>
            Browse Courses
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading your courses...</div>
        ) : enrollments.length === 0 ? (
          <div className="empty-state">
            <p>You haven't enrolled in any courses yet.</p>
            <button className="btn-primary mt" onClick={() => navigate('/courses')}>
              Find Your First Course
            </button>
          </div>
        ) : (
          <div className="course-grid">
            {enrollments.map(e => (
              <div className="course-card" key={e.id}>
                <img
                  src={e.course_thumbnail || `https://img.youtube.com/vi/${e.course_id}/mqdefault.jpg`}
                  alt={e.course_title} className="course-thumb"
                />
                <div className="course-card-body">
                  <h3>{e.course_title}</h3>
                  <div className="progress-wrap">
                    <div className="progress-fill" style={{ width: `${e.progress_percent}%` }} />
                  </div>
                  <span className="progress-lbl">{e.progress_percent}% complete</span>
                  <div className="card-actions">
                    <button className="btn-primary sm"
                      onClick={() => navigate(`/course/${e.course_id}`)}>
                      {e.progress_percent > 0 ? 'Continue' : 'Start'}
                    </button>
                    <button className="btn-ghost sm" onClick={() => handleUnenroll(e.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
