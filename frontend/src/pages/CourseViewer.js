import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeVideo, setActiveVideo] = useState(courseId);
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    api.get(`/enrollments/${courseId}`)
      .then(res => setEnrollment(res.data.enrollment))
      .catch(() => toast.error('Could not load course data'));

    api.get(`/youtube/related?videoId=${courseId}`)
      .then(res => setRelated(res.data.results || []))
      .catch(() => {});
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!enrollment) return;
    const already = enrollment.completed_lessons || [];
    if (already.includes(activeVideo)) {
      return toast('Already marked as complete', { icon: 'ℹ️' });
    }
    const updated = [...already, activeVideo];
    const total = related.length + 1;
    const percent = Math.min(100, Math.round((updated.length / total) * 100));

    try {
      const { data } = await api.patch(`/enrollments/${enrollment.id}/progress`, {
        progress_percent: percent,
        completed_lessons: updated,
      });
      setEnrollment(data.enrollment);
      toast.success('Lesson marked as complete! 🎉');
    } catch {
      toast.error('Could not save progress');
    }
  };

  const isCompleted = (id) => enrollment?.completed_lessons?.includes(id);

  return (
    <div className="viewer-page">
      <div className="viewer-main">
        <button className="back-link" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>

        <div className="video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo}`}
            title="Course video"
            frameBorder="0"
            allowFullScreen
            className="video-iframe"
          />
        </div>

        <div className="viewer-info">
          <h2>{videoTitle || 'Course Lesson'}</h2>
          {enrollment && (
            <div className="viewer-progress">
              <div className="progress-wrap">
                <div className="progress-fill" style={{ width: `${enrollment.progress_percent}%` }} />
              </div>
              <span>{enrollment.progress_percent}% complete</span>
            </div>
          )}
          <button
            className={isCompleted(activeVideo) ? 'btn-completed' : 'btn-primary'}
            onClick={handleMarkComplete}
            disabled={isCompleted(activeVideo)}
          >
            {isCompleted(activeVideo) ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      <div className="viewer-sidebar">
        <h3>Related Videos</h3>
        {related.length === 0 ? (
          <p className="sidebar-empty">No related videos found.</p>
        ) : (
          related.map(v => (
            <div
              key={v.id}
              className={`sidebar-item ${activeVideo === v.id ? 'active' : ''} ${isCompleted(v.id) ? 'done' : ''}`}
              onClick={() => { setActiveVideo(v.id); setVideoTitle(v.title); }}
            >
              <img src={v.thumbnail} alt={v.title} className="sidebar-thumb" />
              <div>
                <p className="sidebar-title">{v.title}</p>
                <p className="sidebar-channel">{v.channel}</p>
                {isCompleted(v.id) && <span className="done-badge">✓ Done</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseViewer;
